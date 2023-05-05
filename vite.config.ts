/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import { resolve, join } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { svgrComponent } from 'vite-plugin-svgr-component';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const wasmDir = require.resolve('@voxeet/voxeet-web-sdk/package.json').replace('package.json', 'dist');
  const wasmPaths = fs.readdirSync(wasmDir);

  const targets = wasmPaths.map((wasmPath) => ({
    src: join(wasmDir, wasmPath),
    dest: `assets/wasm`,
  }));

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
        targets,
      }),
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  };
});
