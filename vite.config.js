import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-pdfjs-worker',
      buildStart() {
        copyFileSync(
          'node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
          'public/pdf.worker.min.mjs'
        )
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'pdf.worker.min.mjs'],
      manifest: {
        name: 'Lexpertise Vite React PWA',
        short_name: 'Lexpertise',
        description: 'React PWA using Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})