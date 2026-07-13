import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'assets',
  base: '/khushi-model-portfolio/',
  server: {
    proxy: { '/api': 'http://localhost:3001' },
    watch: { ignored: ['**/.chrome-*/**'] },
  },
})
