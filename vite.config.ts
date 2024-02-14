import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        'babel-plugin-macros'
      ]
    }
  }),
  dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'build'
  },
  server: {
    proxy: {
      '/api': {
        // config the target url based on your backend server
        // target: 'http://127.0.0.1:8000/',
        target: 'https://stag-api-cms.tsports.com/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
