import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    outDir: '../public'
  },
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      routes: '/src/routes',
      hooks: '/src/hooks',
      utils: '/src/utils',
      assets: '/src/assets'
    }
  }
});
