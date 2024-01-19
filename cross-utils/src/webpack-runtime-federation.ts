import { init } from '@module-federation/runtime';
import { Remote } from '@module-federation/runtime/types';
import { RemoteTypes, ViteRemote } from './types';
import {
  ViteRemotesMap,
  initializeViteFederation,
} from './webpack-vite-bridge';

type InitOptions = Parameters<typeof init>[0];

export type ShareConfigEntry = {
  version: string;
  package: any;
  singleton?: boolean;
};

export type ShareConfig = {
  [dependencyName: string]: ShareConfigEntry;
};

export type CrossRemoteConfig =
  | ({
      remoteType: RemoteTypes.Vite;
      name: string;
    } & ViteRemote)
  | ({
      remoteType?: RemoteTypes.Webpack;
    } & Remote);

export type CreateFederationHostConfig = InitOptions & {
  shareConfig?: ShareConfig;
  hostType?: RemoteTypes;
  remotes: Remote[];
};

export function createFederationOptions({
  shareConfig = {},
  hostType = RemoteTypes.Webpack,
  remotes,
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
    remotes,
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

export function initWebpackHost({
  remotes,
  ...options
}: Omit<CreateFederationHostConfig, 'remotes'> & {
  remotes: CrossRemoteConfig[];
}) {
  const webpackRemotes: Remote[] = [];
  const viteRemotes: ViteRemotesMap = {};
  for (const remote of remotes) {
    if (remote.remoteType === RemoteTypes.Vite) {
      viteRemotes[remote.name] = {
        url: remote.url,
        format: remote.format,
        loaded: remote.loaded,
      };
    } else {
      webpackRemotes.push(remote as Remote);
    }
  }
  console.log({ webpackRemotes, viteRemotes });
  const host = init(
    createFederationOptions({ remotes: webpackRemotes, ...options }),
  );
  if (options.hostType === RemoteTypes.Vite) {
    bridgeViteHostShareScope(options.name, options.shareConfig);
  }

  initializeViteFederation(options.name, 'default', viteRemotes);
  return host;
}
