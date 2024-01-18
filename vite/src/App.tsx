import Counter from './exposedModules/Counter';
import AsyncComponent from './AsyncComponent';
import { initRemoteEntries } from './remoteLoader';
import React from 'react';
import ReactDom from 'react-dom';

initRemoteEntries();

/**
 * Following section is necessary to simulate module federation API for vite
 * The federation API in vite is different from webpack as Rspack
 * Final product will require more robust solution
 */

/* eslint-disable no-undef */
// @ts-ignore
const viteHost = __FEDERATION__.__INSTANCES__.find(
  // @ts-ignore
  (host) => host.name === 'ViteApp',
);

if (!viteHost!.shareScopeMap.default) {
  viteHost!.shareScopeMap.default = {};
}

viteHost!.shareScopeMap.default.react = {
  '18.2.0': {
    deps: [],
    from: 'ViteApp',
    // @ts-ignore
    get: () => React,
    lib: () => React,
    loaded: true,
    loading: null,
    scope: ['default'],
    shareConfig: {
      requiredVersion: '^18.2.0',
      singleton: false,
      eager: false,
      strictVersion: false,
    },
    strategy: 'version-first',
    useIn: [],
    version: '18.2.0',
  },
};

viteHost!.shareScopeMap.default['react-dom'] = {
  '18.2.0': {
    deps: [],
    from: 'ViteApp',
    // @ts-ignore
    get: () => ReactDom,
    lib: () => ReactDom,
    loaded: true,
    loading: null,
    scope: ['default'],
    shareConfig: {
      requiredVersion: '^18.2.0',
      singleton: false,
      eager: false,
      strictVersion: false,
    },
    strategy: 'version-first',
    useIn: [],
    version: '18.2.0',
  },
};
/* eslint-enable no-undef */

function App() {
  return (
    <div>
      <div>
        <Counter />
      </div>
      <div>
        <AsyncComponent remote="RspackApp" module="RspackCounter" />
      </div>
    </div>
  );
}

export default App;
