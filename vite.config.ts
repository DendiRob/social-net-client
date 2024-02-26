import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import paths from 'vite-tsconfig-paths';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  envDir: '../',
  build: {
    outDir: '../dist'
  },
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), './public/images/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    paths({ root: '../' })
  ]
});
