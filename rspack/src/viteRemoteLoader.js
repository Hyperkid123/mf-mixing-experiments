import React from 'react';
import ReactDOM from 'react-dom';

const remotesMap = {
  ViteApp: { url: 'http://localhost:5173/assets/vite-entry.js', format: 'esm' },
};
window.remotesMap = remotesMap
const loadJS = (url, fn) => {
  const script = document.createElement('script');
  script.type = 'module';
  script.onload = fn;
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};
const scriptTypes = ['var', 'systemjs'];
const importTypes = ['esm'];
const shareScope = {
  react: {
    '18.2.0': {
      metaGet: () => () => React,
      get: () => () => React,
      loaded: 1,
    },
  },
  'react-dom': {
    '18.2.0': {
      metaGet: () => () => ReactDOM,
      get: () => () => ReactDOM,
      loaded: 1,
    },
  },
};

globalThis.__federation__ = {
  ensure: async (remoteId) => {
    const remote = remotesMap[remoteId];
    if (!remote.inited) {
      if (scriptTypes.includes(remote.format)) {
        // loading js with script tag
        return new Promise((resolve) => {
          const callback = () => {
            if (!remote.inited) {
              remote.lib = window[remoteId];
              remote.lib.init(shareScope);
              remote.inited = true;
            }
            resolve(remote.lib);
          };
          loadJS(remote.url, callback);
        });
      } else if (importTypes.includes(remote.format)) {
        // loading js with import(...)
        return new Promise((resolve) => {
          return import(remote.url).then((lib) => {
            if (!remote.inited) {
              lib.init(shareScope);
              remote.lib = lib;
              remote.lib.init(shareScope);
              remote.inited = true;
              remote.lib.get('./ViteCounter').then((m) => {
                window.tempCache = m;
                return m;
              });
            }
            resolve(remote.lib);
          });
        });
      }
    } else {
      return remote.lib;
    }
  },
};
