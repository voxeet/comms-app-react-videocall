/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { svgrComponent } from 'vite-plugin-svgr-component';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      BASE_URL: env.BASE_URL,
    },
    base: env.BASE_URL,
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      svgrComponent(),
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  };
});
