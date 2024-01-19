import { createFederationOptions, initWebpackHost } from 'cross-utils';

export const initRemoteEntries = () => {
  const options = createFederationOptions({
    name: 'RspackApp',
    shareConfig: {},
    remotes: [
      {
        name: 'WebpackApp',
        entry: 'http://localhost:8001/webpack-entry.js',
      },
      {
        name: 'WebpackNativeApp',
        entry: 'http://localhost:8002/webpack-native-entry.js',
      },
    ],
  });
  initWebpackHost(options);
};
