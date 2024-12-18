import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html', // For your popup.html
        content: 'src/content/content.js', // For the content script
        "content-main": 'src/content/content-main.jsx', // For the main content script
      },
      output: {
        entryFileNames: 'assets/[name].js', // Output file format
      },
    },
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clean up output directory on each build
    target: 'esnext', // Ensure compatibility with modern browsers
    assetsInlineLimit: 0, // Prevent assets from being inlined
  },
})