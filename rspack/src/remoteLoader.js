import { RemoteTypes, initWebpackHost } from 'cross-utils';
export const initRemoteEntries = () => {
  initWebpackHost({
    name: 'RspackApp',
    shareConfig: {},
    remotes: [
      {
        name: 'WebpackApp',
        entry: 'http://localhost:8001/webpack-entry.js',
        remoteType: RemoteTypes.Webpack,
      },
      {
        name: 'WebpackNativeApp',
        entry: 'http://localhost:8002/webpack-native-entry.js',
        remoteType: RemoteTypes.Webpack,
      },
      {
        name: 'ViteApp',
        remoteType: RemoteTypes.Vite,
        url: 'http://localhost:5173/assets/vite-entry.js',
        format: 'esm',
      },
    ],
  });
};
