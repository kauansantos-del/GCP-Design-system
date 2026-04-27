// Rebuilds public/hugeicons-index.json by inspecting each SVG and classifying
// it as 'outline' | 'solid' | 'duotone' based on content (the .svg/.1.svg/.2.svg
// suffix is NOT consistent across icons in this pack).
//
// Heuristic per icon (group of files sharing a base name):
//   - any file containing opacity="0.x" → duotone
//   - among the remaining two, the larger byte-size = outline (stroke→path is
//     verbose), smaller = solid (single filled shape).
//
// Usage:  node scripts/rebuild-hugeicons-index.mjs

import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const iconsDir = join(root, 'galeria', 'huge icons pack.iconjar', 'icons')
const outputPath = join(root, 'public', 'hugeicons-index.json')

const opacityRegex = /opacity="0\.[0-9]+"/
const strokeRegex = /\sstroke="(?!none")[^"]+"/
const evenoddRegex = /fill-rule="evenodd"/

function detectStyle(content) {
  const hasOpacity = opacityRegex.test(content)
  const hasStroke = strokeRegex.test(content)
  const hasEvenodd = evenoddRegex.test(content)
  // Priority: duotone (opacity) > outline (stroke=) > solid (evenodd) > unknown
  if (hasOpacity) return 'duotone'
  if (hasStroke) return 'outline'
  if (hasEvenodd) return 'solid'
  return 'unknown'
}

function classify(group) {
  // group: { name, files: [{file, size, detected}] }
  const result = {}

  // Pass 1: take definitively-detected files first
  for (const key of ['duotone', 'outline', 'solid']) {
    const matches = group.files.filter((f) => f.detected === key)
    if (matches.length === 0) continue
    // If multiple, prefer the largest (more elaborate variant)
    const pick = matches.sort((a, b) => b.size - a.size)[0]
    result[key] = pick.file
  }

  // Pass 2: fill missing slots from 'unknown' files using size heuristic
  const used = new Set(Object.values(result))
  const unknown = group.files.filter((f) => !used.has(f.file))
  if (unknown.length > 0) {
    const sorted = [...unknown].sort((a, b) => a.size - b.size)
    // For each missing slot, pick by typical size profile
    if (!result.solid && sorted.length) {
      result.solid = sorted.shift().file
    }
    if (!result.outline && sorted.length) {
      // Outline tends to be the largest (stroke-converted-to-path is verbose)
      result.outline = sorted.pop().file
    }
    if (!result.duotone && sorted.length) {
      result.duotone = sorted[0].file
    }
  }

  return result
}

function main() {
  const files = readdirSync(iconsDir).filter((f) => f.endsWith('.svg'))
  console.log(`Scanning ${files.length} svg files in ${iconsDir}...`)

  // Group files by base name (strip .1.svg / .2.svg / .svg)
  const groups = new Map()
  for (const file of files) {
    const base = file.replace(/\.\d+\.svg$|\.svg$/, '')
    if (!groups.has(base)) groups.set(base, { name: base, files: [] })
    const fullPath = join(iconsDir, file)
    const content = readFileSync(fullPath, 'utf8')
    const stat = statSync(fullPath)
    groups.get(base).files.push({
      file,
      size: stat.size,
      detected: detectStyle(content),
    })
  }

  // Build index
  const index = []
  let stats = { duotone: 0, solid: 0, outline: 0, incomplete: 0 }
  for (const [, group] of groups) {
    const cls = classify(group)
    const styles = []
    if (cls.outline) styles.push({ key: 'outline', file: cls.outline })
    if (cls.solid) styles.push({ key: 'solid', file: cls.solid })
    if (cls.duotone) styles.push({ key: 'duotone', file: cls.duotone })

    if (cls.outline) stats.outline++
    if (cls.solid) stats.solid++
    if (cls.duotone) stats.duotone++
    if (styles.length < 3) stats.incomplete++

    index.push({ name: group.name, styles })
  }

  index.sort((a, b) => a.name.localeCompare(b.name))

  writeFileSync(outputPath, JSON.stringify(index))
  console.log(`Wrote ${index.length} icons to ${outputPath}`)
  console.log(`Counts: outline=${stats.outline}, solid=${stats.solid}, duotone=${stats.duotone}`)
  console.log(`Incomplete groups (less than 3 styles): ${stats.incomplete}`)
}

main()
