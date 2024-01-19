import '@module-federation/runtime/types';

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
  format: 'esm'; // add more based on VITE API
  loaded?: boolean;
  lib?: {
    init: (shareScope: ViteShareScope) => void;
    get: (moduleName: string) => Promise<() => any>;
  };
};

export type ViteRemotesMap = {
  [remoteName: string]: ViteRemote;
};

export type ViteFederation = {
  // init the remote
  ensure: (remoteId: string) => Promise<any>;
  remotesMap: ViteRemotesMap;
  shareScope: ViteShareScope;
};

declare global {
  var __federation__: ViteFederation;
}

const importTypes = ['esm'];

export const initializeViteFederation = (
  baseAppName: string,
  shareScopeName: string,
  remotesConfig: ViteRemotesMap,
) => {
  const internalRemotesMap = {
    ...remotesConfig,
  };
  const federationShareScope =
    global.__FEDERATION__.__SHARE__[baseAppName][shareScopeName];

  const viteShareScope: ViteShareScope = {};

  for (const pkgName in federationShareScope) {
    const versions = federationShareScope[pkgName];
    for (const version in versions) {
      const pkg = versions[version];
      if (!viteShareScope[pkgName]) {
        viteShareScope[pkgName] = {};
      }
      // Do something with pkg
      viteShareScope[pkgName][version] = {
        get: () => pkg.lib!,
        metaGet: () => pkg.lib!,
        loaded: 1,
      };
    }
  }

  const ensure = async (remoteId: string) => {
    const remote = internalRemotesMap[remoteId];
    if (!remote.loaded) {
      if (importTypes.includes(remote.format)) {
        // loading js with import(...)
        return new Promise((resolve) => {
          return import(/* @vite-ignore */ remote.url).then((lib) => {
            if (!remote.loaded) {
              remote.lib = lib;
              if (remote.lib) {
                remote.lib.init(viteShareScope);
                remote.loaded = true;
                remote.lib.get('./ViteCounter').then((m) => {
                  return m;
                });
              }
            }
            resolve(remote.lib);
          });
        });
      }
    } else {
      return remote.lib;
    }
  };

  const viteApi: ViteFederation = {
    ensure,
    remotesMap: internalRemotesMap,
    shareScope: viteShareScope,
  };

  global.__federation__ = viteApi;
  return viteApi;
};
