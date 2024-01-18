import { init } from '@module-federation/runtime-tools';
import 'systemjs';

export const initRemoteEntries = async () => {
  init({
    name: 'RspackApp',
    remotes: [
      {
        name: 'WebpackApp',
        entry: 'http://localhost:8001/webpack-entry.js',
      },
      {
        name: 'ViteApp',
        entry: 'http://localhost:5173/assets/vite-entry.js',
      },
    ],
  });
};
