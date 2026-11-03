import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // Enable Fast Refresh for better development experience
    fastRefresh: true,
    // Use automatic JSX runtime
    jsxRuntime: 'automatic',
  })],
  base: '/',
  build: {
    // backdrop-filter, color-mix and WebGL2 already need a modern browser
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild', // Use esbuild for faster builds
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
})
