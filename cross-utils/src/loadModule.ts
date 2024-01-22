import { loadRemote } from '@module-federation/runtime';
import { RemoteTypes } from './types';
import { ComponentType } from 'react';

const loadViteModule = async (remote: string, module: string) => {
  if (!globalThis.__federation__) {
    throw new Error('Vite dynamic module federation was not initialized!');
  }
  await globalThis.__federation__.ensure(remote, `./${module}`);
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

const loadModule = (remote: string, module: string) => {
  const remoteType = resolveRemoteType(remote);
  if (remoteType === RemoteTypes.Webpack) {
    return loadRemote(`${remote}/${module}`) as Promise<{
      default: ComponentType;
    }>;
  } else if (remoteType === RemoteTypes.Vite) {
    return loadViteModule(remote, module);
  } else {
    throw new Error(
      `Remote ${remote} is not a valid webpack or vite remote. Make sure you have initialized the remote.`,
    );
  }
};

export default loadModule;
