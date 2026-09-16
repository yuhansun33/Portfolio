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
    // Target modern browsers with extra Safari compatibility
    target: ['es2015', 'safari12'],
    // Enable polyfills for older browsers
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
  // Optimize dependencies for better browser support
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})
