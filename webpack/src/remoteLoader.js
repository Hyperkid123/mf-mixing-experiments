import { init } from '@module-federation/runtime-tools';

export const initRemoteEntries = async () => {
  init({
    name: 'WebpackApp',
    remotes: [
      {
        name: 'RspackApp',
        entry: 'http://localhost:8080/rspack-entry.js',
      },
    ],
  });
};
