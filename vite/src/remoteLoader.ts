import React from 'react';
import ReactDom from 'react-dom';
import { initWebpackHost, RemoteTypes } from 'cross-utils';
import * as SP from 'shared-package';

export const initRemoteEntries = async () => {
  return initWebpackHost({
    name: 'ViteApp',
    hostType: RemoteTypes.Vite,
    // TODO: Automate share scope definition
    shareConfig: {
      react: {
        version: '18.2.0',
        package: React,
        singleton: true,
      },
      'react-dom': {
        version: '18.2.0',
        package: ReactDom,
        singleton: true,
      },
      'shared-package': {
        version: '1.0.0',
        singleton: true,
        package: SP,
      },
    },
    remotes: [
      {
        name: 'RspackApp',
        entry: 'http://localhost:8080/rspack-entry.js',
      },
      {
        name: 'WebpackApp',
        entry: 'http://localhost:8001/webpack-entry.js',
      },
      {
        name: 'WebpackNativeApp',
        entry: 'http://localhost:8002/webpack-native-entry.js',
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
