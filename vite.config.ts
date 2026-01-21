import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Ensuring this is always a string prevents build crashes
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || "")
  }
});