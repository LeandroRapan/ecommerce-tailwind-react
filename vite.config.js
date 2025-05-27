import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  base: './' // Esto es importante para que los paths funcionen correctamente
  // build: {
  //   outDir: 'dist',       // 1. Directorio de salida claro
  //   minify: 'terser',     // 2. Minificación activada
  //   sourcemap: true       // 3. Sourcemaps para debugging
  // },
  // base: './'              // 4. Paths relativos para pre-render
})
