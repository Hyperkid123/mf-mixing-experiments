import { init } from '@module-federation/runtime';

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
};

export function createFederationOptions({
  shareConfig = {},
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

export function initWebpackHost(options: CreateFederationHostConfig) {
  return init(createFederationOptions(options));
}
