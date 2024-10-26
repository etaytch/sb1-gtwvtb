import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Enable detailed error overlay
    hmr: {
      overlay: true,
    },
  },
  build: {
    // Generate source maps for production debugging
    sourcemap: true,
  },
});