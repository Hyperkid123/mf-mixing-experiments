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
  shared: [
    {
      react: {
        import: false,
      },
      'react-dom': {
        import: false,
      },
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [react(), MFPlugin],
});
