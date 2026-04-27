import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

function serveGaleria(): Plugin {
  // Dev-only fallback: serves the original heavy renders/icons-3D PNGs that
  // live in ./galeria (gitignored, kept local). Anything that ships to prod
  // (thumbnails, medium-res WebP, Hugeicons SVGs) is in /public/galeria/...
  // and is served directly by Vite's static-asset pipeline.
  const root = path.resolve(__dirname, './galeria')
  const exts: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
  }
  return {
    name: 'serve-galeria',
    configureServer(server) {
      server.middlewares.use('/galeria', (req, res, next) => {
        try {
          const url = decodeURIComponent((req.url ?? '/').split('?')[0])
          const safe = path.normalize(url).replace(/^[\\/]+/, '')
          const filePath = path.join(root, safe)
          if (!filePath.startsWith(root)) return next()
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next()
          const ext = path.extname(filePath).toLowerCase()
          res.setHeader('Content-Type', exts[ext] ?? 'application/octet-stream')
          res.setHeader('Cache-Control', 'public, max-age=3600')
          fs.createReadStream(filePath).pipe(res)
        } catch {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveGaleria()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
