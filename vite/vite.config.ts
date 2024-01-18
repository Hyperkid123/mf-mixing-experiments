import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import topLevelAwait from 'vite-plugin-top-level-await';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

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
    },
  ],
});

export default defineConfig({
  build: {
    // target: 'ES2015',
    // rollupOptions: {
    //   output: {
    //     format: 'system',
    //     inlineDynamicImports: false,
    //   },
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
    // getBabelOutputPlugin({
    //   presets: [
    //     [
    //       '@babel/preset-env',
    //       {
    //         targets: {
    //           ie: '11',
    //         },
    //       },
    //     ],
    //   ],
    // }),
  ],
});
