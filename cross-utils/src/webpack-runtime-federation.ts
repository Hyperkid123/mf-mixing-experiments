import { init } from '@module-federation/runtime';
import { RemoteTypes } from './types';

type InitOptions = Parameters<typeof init>[0];

export type ShareConfigEntry = {
  version: string;
  package: any;
  singleton?: boolean;
};

export type ShareConfig = {
  [dependencyName: string]: ShareConfigEntry;
};

export type CreateFederationHostConfig = InitOptions & {
  shareConfig?: ShareConfig;
  hostType?: RemoteTypes;
};

export function createFederationOptions({
  shareConfig = {},
  hostType = RemoteTypes.Webpack,
  ...userOptions
}: CreateFederationHostConfig): InitOptions {
  const federationShare = Object.entries<any>(shareConfig).reduce(
    (acc, [name, options]) => {
      acc[name] = {
        version: options.version,
        lib: () => options.package,
        shareConfig: {
          singleton: options.singleton,
          requiredVersion: options.version,
        },
      };
      return acc;
    },
    {} as any,
  );
  const options: InitOptions = {
    ...userOptions,
    shared: federationShare,
  };
  return options;
}

/**
 * Following section is necessary to simulate module federation API for vite
 * The federation API in vite is different from webpack as Rspack
 * Final product will require more robust solution
 */

function bridgeViteHostShareScope(name: string, shareConfig: ShareConfig = {}) {
  const viteHost = globalThis.__FEDERATION__.__INSTANCES__.find(
    // @ts-ignore
    (host) => host.name === name,
  );

  if (!viteHost) {
    throw new Error(
      `Unable to find module federation host ${name}! Initialize the host first!`,
    );
  }

  if (!viteHost.shareScopeMap.default) {
    viteHost.shareScopeMap.default = {};
  }

  for (const pkgName in shareConfig) {
    if (!viteHost.shareScopeMap.default[pkgName]) {
      viteHost.shareScopeMap.default[pkgName] = {};
    }

    if (
      !viteHost.shareScopeMap.default[pkgName][shareConfig[pkgName].version]
    ) {
      const pkg = shareConfig[pkgName];
      viteHost.shareScopeMap.default[pkgName][pkg.version] = {
        deps: [],
        from: name,
        get: () => pkg.package,
        lib: () => pkg.package,
        loaded: true,
        loading: null,
        scope: ['default'],
        shareConfig: {
          requiredVersion: pkg.version,
          singleton: pkg.singleton,
        },
        strategy: 'version-first',
        useIn: [],
        version: pkg.version,
      };
    }
  }
}

export function initWebpackHost(options: CreateFederationHostConfig) {
  const host = init(createFederationOptions(options));
  if (options.hostType === RemoteTypes.Vite) {
    bridgeViteHostShareScope(options.name, options.shareConfig);
  }
  return host;
}
