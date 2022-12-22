/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { svgrComponent } from 'vite-plugin-svgr-component';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      BASE_URL: env.BASE_URL,
    },
    resolve: {
      alias: {
        '@src': resolve(__dirname, './src/'),
        '@hooks': resolve(__dirname, './src/hooks/'),
        '@components': resolve(__dirname, './src/components/'),
        '@styles': resolve(__dirname, './src/styles/'),
        '@context': resolve(__dirname, './src/context/'),
        '@assets': resolve(__dirname, './src/assets/'),
      },
    },
    base: env.BASE_URL,
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      svgrComponent(),
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/@voxeet/voxeet-web-sdk/dist/vsl_impl.pkgwvsl',
            dest: 'assets/wasm',
          },
          {
            src: 'node_modules/@voxeet/voxeet-web-sdk/dist/vsl_impl.wasm',
            dest: 'assets/wasm',
          },
          {
            src: 'node_modules/@voxeet/voxeet-web-sdk/dist/dvwc_impl.wasm',
            dest: 'assets/wasm',
          },
          {
            src: 'node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-dvwc-worker.js',
            dest: 'assets/wasm',
          },
          {
            src: 'node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-worklet.js',
            dest: 'assets/wasm',
          },
        ],
      }),
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  };
});
