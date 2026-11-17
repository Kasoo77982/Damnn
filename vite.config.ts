import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { remotionVite } from '@remotion/cli/vite';

export default defineConfig({
  plugins: [react(), remotionVite()],
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'remotion'],
  },
});
