import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

const MFPlugin = federation({
  name: 'ViteApp',
  filename: 'vite-entry.js',
  // Modules to expose
  exposes: {
    './ViteCounter': './src/exposedModules/Counter.tsx',
  },
  remoteType: 'global',
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

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [react() ],
});
