import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel e GitHub Pages (mr-lucasz.github.io) servem na raiz; BASE_PATH sobrescreve se preciso
  base: process.env.BASE_PATH || '/',
})
