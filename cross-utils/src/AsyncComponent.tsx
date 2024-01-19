import React, { Suspense, lazy, useMemo } from 'react';
import '@module-federation/runtime/types';
import { loadRemote } from '@module-federation/runtime';

export type AsyncComponentProps = {
  remote: string;
  module: string;
};

export enum RemoteTypes {
  Webpack = 'Webpack',
  Vite = 'Vite',
}

function resolveRemoteType(remote: string): RemoteTypes {
  const isWebpack = globalThis?.__FEDERATION__?.__INSTANCES__.find(
    (instance) => instance.name === remote,
  );
  if (isWebpack) {
    return RemoteTypes.Webpack;
  }

  const isVite = Object.prototype.hasOwnProperty.call(
    globalThis?.__federation__?.remotesMap ?? {},
    remote,
  );

  if (isVite) {
    return RemoteTypes.Vite;
  }

  return RemoteTypes.Webpack;
}

const WebpackWrapper = ({ remote, module }: AsyncComponentProps) => {
  const Component = useMemo(
    () =>
      lazy(
        () =>
          loadRemote(`${remote}/${module}`) as Promise<{
            default: React.ComponentType;
          }>,
      ),
    [remote, module],
  );
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component />
    </Suspense>
  );
};

const loadViteModule = async (remote: string, module: string) => {
  if (!globalThis.__federation__) {
    throw new Error('Vite dynamic module federation was not initialized!');
  }
  await globalThis.__federation__.ensure(remote);
  if (
    !globalThis.__federation__.remotesMap[remote] ||
    !globalThis.__federation__.remotesMap[remote]?.loaded ||
    !globalThis.__federation__.remotesMap[remote].lib
  ) {
    throw new Error(
      `Trying to access Vite remote ${remote} before initialization.`,
    );
  }

  const c = await globalThis.__federation__.remotesMap[remote].lib!.get(
    `./${module}`,
  );
  return c();
};

const ViteWrapper = ({ remote, module }: AsyncComponentProps) => {
  const Component = useMemo(
    () => lazy(() => loadViteModule(remote, module)),
    [remote, module],
  );
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component />
    </Suspense>
  );
};

const AsyncComponent = ({ remote, module }: AsyncComponentProps) => {
  const remoteType = resolveRemoteType(remote);
  if (remoteType === RemoteTypes.Webpack) {
    return <WebpackWrapper remote={remote} module={module} />;
  } else if (remoteType === RemoteTypes.Vite) {
    return <ViteWrapper remote={remote} module={module} />;
  }

  return null;
};

export default AsyncComponent;
