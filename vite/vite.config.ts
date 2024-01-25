import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import topLevelAwait from 'vite-plugin-top-level-await';
import devManifest from 'vite-plugin-dev-manifest';

const MFPlugin = federation({
  // base: 'http://localhost:5173',
  name: 'ViteApp',
  filename: 'vite-entry.js',
  // Modules to expose
  exposes: {
    './ViteCounter': './src/exposedModules/Counter.tsx',
  },
  remoteType: 'var',
  shared: [
    {
      react: {
        // @ts-ignore
        singleton: true,
        requiredVersion: '>=17.0.2',
      },
      'react-dom': {
        // @ts-ignore
        singleton: true,
        requiredVersion: '>=17.0.2',
      },
      'shared-package': {
        // @ts-ignore
        singleton: true,
        requiredVersion: '>=1.0.0',
      },
      '@mui/material/Button': {
        requiredVersion: '>=5.0.0',
        version: '5.15.6',
      },
      '@mui/material/TextField': {
        requiredVersion: '>=5.0.0',
        version: '5.15.6',
      },
      '@mui/material/Typography': {
        requiredVersion: '>=5.0.0',
        version: '5.15.6',
      },
      '@mui/material/Divider': {
        requiredVersion: '>=5.0.0',
        version: '5.15.6',
      },
      '@emotion/react': {
        requiredVersion: '>=11.0.0',
      },
      '@emotion/styled': {
        requiredVersion: '>=11.0.0',
      },
    },
  ],
});

export default defineConfig({
  build: {
    manifest: true,
    minify: false,
    // rollupOptions: {
    //   input: 'src/main.tsx',
    // },
  },
  plugins: [
    react(),
    MFPlugin,
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
    devManifest(),
  ],
});
