import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  "envDir": "./environment",
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});