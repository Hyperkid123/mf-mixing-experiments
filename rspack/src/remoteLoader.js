import { init } from '@module-federation/runtime-tools';

export const initRemoteEntries = async () => {
  init({
    name: 'RspackApp',
    remotes: [
      {
        name: 'WebpackApp',
        entry: 'http://localhost:8001/webpack-entry.js',
      },
    ],
  });
};
