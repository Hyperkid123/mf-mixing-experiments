import React from 'react';
import ReactDom from 'react-dom';
import { initWebpackHost, RemoteTypes } from 'cross-utils';

export const initRemoteEntries = async () => {
  return initWebpackHost({
    name: 'ViteApp',
    hostType: RemoteTypes.Vite,
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
    },
    remotes: [
      {
        name: 'RspackApp',
        entry: 'http://localhost:8080/rspack-entry.js',
      },
    ],
  });
};
