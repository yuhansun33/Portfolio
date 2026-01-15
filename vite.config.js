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
  base: '/Portfolio/',
  build: {
    // Target modern browsers for better compatibility
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    // Enable polyfills for older browsers
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild', // Use esbuild for faster builds
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
