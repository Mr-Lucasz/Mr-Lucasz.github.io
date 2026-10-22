import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vercel serve na raiz; o GitHub Pages serve em /myResume/ (definido no workflow)
  base: process.env.BASE_PATH || '/',
})
