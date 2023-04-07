import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/multi-unit-converter-site/',
  plugins: [react()],
  build: {
    outDir: 'docs' // Rename the output directory to `docs`
  }
})