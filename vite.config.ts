
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    // Add history API fallback for SPA routing
    historyApiFallback: {
      rewrites: [
        { from: /^\/.*$/, to: '/index.html' },
      ],
    },
  },
  preview: {
    port: 8080,
    // Also add for preview server
    historyApiFallback: {
      rewrites: [
        { from: /^\/.*$/, to: '/index.html' },
      ],
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add base URL configuration to ensure assets load correctly
  base: "/",
});
