// @ts-ignore
import { init } from '@module-federation/runtime-tools';
import React from 'react';
import ReactDom from 'react-dom';

export const initRemoteEntries = async () => {
  init({
    name: 'ViteApp',
    shared: [
      {
        react: {
          lib: () => React,
          shareConfig: {
            singleton: true,
            requiredVersion: '>=17.0.2',
          },
        },
        'react-dom': {
          shareConfig: {
            singleton: true,
            requiredVersion: '>=17.0.2',
          },
          lib: () => ReactDom,
        },
      },
    ],
    remotes: [
      {
        name: 'RspackApp',
        entry: 'http://localhost:8080/rspack-entry.js',
      },
    ],
  });
};
