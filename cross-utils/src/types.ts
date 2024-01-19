export enum RemoteTypes {
  Webpack = 'Webpack',
  Vite = 'Vite',
}

export type ViteRemoteFormat = 'esm';

export type ViteShareScope = {
  [pkgName: string]: {
    [version: string]: {
      get: () => () => any | undefined;
      metaGet: () => () => any | undefined;
      loaded: 0 | 1;
    };
  };
};

export type ViteRemote = {
  url: string;
  format: ViteRemoteFormat; // add more based on VITE API
  loaded?: boolean;
  lib?: {
    init: (shareScope: ViteShareScope) => void;
    get: (moduleName: string) => Promise<() => any>;
  };
};