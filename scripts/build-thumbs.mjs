// Generates two WebP variants of every PNG/JPG inside galeria/Categorias - *
// and galeria/icons 3D, written into public/galeria/.thumbs/ (360px wide,
// for grid tiles) and public/galeria/.medium/ (1080px wide, for the modal
// preview and downloads).
//
// Skips files whose existing thumb is newer than the source.
//
// Usage:  node scripts/build-thumbs.mjs

import { readdirSync, statSync, mkdirSync, existsSync, copyFileSync } from 'node:fs'
import { join, relative, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', 'galeria')
const publicGaleria = join(__dirname, '..', 'public', 'galeria')
// Use non-dotfile names because Vite skips files starting with "." when
// copying /public into the build output.
const thumbRoot = join(publicGaleria, '_thumbs')
const mediumRoot = join(publicGaleria, '_medium')

const SOURCE_DIRS = [
  'Categorias - Construir',
  'Categorias - Objetos',
  'icons 3D',
]
const SRC_EXTS = new Set(['.png', '.jpg', '.jpeg'])

const VARIANTS = [
  { name: 'thumb', root: thumbRoot, width: 360, quality: 76 },
  { name: 'medium', root: mediumRoot, width: 1080, quality: 82 },
]

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.isFile()) yield full
  }
}

async function processOne(src) {
  const ext = extname(src).toLowerCase()
  if (!SRC_EXTS.has(ext)) return null

  const rel = relative(root, src)
  let wrote = 0, skipped = 0

  for (const variant of VARIANTS) {
    const out = join(variant.root, rel.replace(/\.(png|jpe?g)$/i, '.webp'))
    if (existsSync(out)) {
      const srcStat = statSync(src)
      const outStat = statSync(out)
      if (outStat.mtimeMs >= srcStat.mtimeMs) { skipped++; continue }
    }
    mkdirSync(dirname(out), { recursive: true })
    await sharp(src)
      .resize({ width: variant.width, withoutEnlargement: true })
      .webp({ quality: variant.quality })
      .toFile(out)
    wrote++
  }

  return { wrote, skipped }
}

function copyHugeicons() {
  // Hugeicons are SVG (already small), just mirror them into public so
  // they ship with the build. Skip if destination is up-to-date.
  const srcDir = join(root, 'huge icons pack.iconjar', 'icons')
  if (!existsSync(srcDir)) return 0
  const dstDir = join(publicGaleria, 'huge icons pack.iconjar', 'icons')
  mkdirSync(dstDir, { recursive: true })

  let copied = 0, skipped = 0
  for (const file of walk(srcDir)) {
    if (!file.endsWith('.svg')) continue
    const rel = relative(srcDir, file)
    const dst = join(dstDir, rel)
    if (existsSync(dst)) {
      const srcStat = statSync(file)
      const dstStat = statSync(dst)
      if (dstStat.mtimeMs >= srcStat.mtimeMs) { skipped++; continue }
    }
    mkdirSync(dirname(dst), { recursive: true })
    copyFileSync(file, dst)
    copied++
  }
  console.log(`Hugeicons: copied=${copied} skipped=${skipped}`)
  return copied
}

async function main() {
  let totalWrote = 0, totalSkipped = 0, failed = 0
  const tasks = []
  for (const sub of SOURCE_DIRS) {
    const dir = join(root, sub)
    if (!existsSync(dir)) {
      console.warn(`Missing: ${dir}`)
      continue
    }
    for (const file of walk(dir)) tasks.push(file)
  }
  console.log(`Processing ${tasks.length} source images (× ${VARIANTS.length} variants)...`)

  const CONCURRENCY = 6
  let cursor = 0
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < tasks.length) {
        const idx = cursor++
        const file = tasks[idx]
        try {
          const r = await processOne(file)
          if (r) { totalWrote += r.wrote; totalSkipped += r.skipped }
        } catch (err) {
          failed++
          console.error(`FAILED: ${file}`, err.message)
        }
      }
    })
  )

  console.log(`Renders: wrote=${totalWrote} skipped=${totalSkipped} failed=${failed}`)
  copyHugeicons()
}

main().catch((e) => { console.error(e); process.exit(1) })
