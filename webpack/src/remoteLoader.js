import { RemoteTypes, initWebpackHost } from 'cross-utils';

export const initRemoteEntries = () => {
  return initWebpackHost({
    name: 'WebpackApp',
    remotes: [
      {
        name: 'RspackApp',
        entry: 'http://localhost:8080/rspack-entry.js',
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
      {
        name: 'CollectionRspackApp',
        entry: 'http://localhost:8888/rspack/collection-rspack-entry.js',
      },
      {
        name: 'CollectionWebpack',
        entry: 'http://localhost:8888/webpack/collection-webpack-entry.js',
      },
      {
        name: 'CollectionViteApp',
        remoteType: RemoteTypes.Vite,
        url: 'http://localhost:8888/vite/assets/collection-vite-entry.js',
        format: 'esm',
      },
    ],
  });
};
