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
        name: 'WebpackNativeApp',
        entry: 'http://localhost:8002/webpack-native-entry.js',
      },
    ],
  });
};
