import { init } from '@module-federation/runtime';

export const initRemoteEntries = async () => {
  init({
    name: 'WebpackApp',
    remotes: [
      {
        name: 'RspackApp',
        entry: 'http://localhost:8080/rspack-entry.js',
      },
      {
        name: 'ViteApp',
        entry: 'http://localhost:5173/assets/vite-entry.js',
      },
    ],
  });
};
