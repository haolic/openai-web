import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import { viteMockServe } from 'vite-plugin-mock';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import { terser } from 'rollup-plugin-terser';
import apiservice from './serviceip';

export default defineConfig({
  plugins: [
    react(),
    viteExternalsPlugin({
      react: 'React',
      'react-dom': 'ReactDOM',
      classnames: 'classNames',
      lodash: '_',
    }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: false
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: false,
    }),
    terser(),
  ],
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {},
      },
      plugins: [terser()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { colorPrimary: '#982369', paddingLG: 8 },
      },
    },
  },
  server:{
    proxy: {
      '/api': {
        target: apiservice,
        changeOrigin: true,
      },
    }
  }
});
