
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification for production builds
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Configure chunk size optimization
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps in production for smaller files
    rollupOptions: {
      output: {
        // Improve chunking strategy
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
          ],
          tanstack: [
            '@tanstack/react-query'
          ],
          ui: [
            '@radix-ui/react-accordion', 
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            'class-variance-authority',
            'clsx',
            'tailwind-merge'
          ],
          forms: [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          charts: [
            'recharts'
          ]
        },
        // Ensure chunks don't change names between builds
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Add cache-busting for assets
    reportCompressedSize: false // Skip compressed size reporting for faster builds
  },
  // Add special build optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query'
    ],
    exclude: ['@capacitor/core'] // Example for excluding packages that cause issues
  }
}));
