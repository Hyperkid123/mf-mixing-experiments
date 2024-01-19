import React from 'react';
import Counter from './exposedModules/counter';
import { initRemoteEntries } from './remoteLoader';

import { initializeViteFederation, AsyncComponent } from 'cross-utils';

// import './viteRemoteLoader';
// import AsyncViteComponent from './AsyncViteComponent';

// Initialize remote containers before rendering
initRemoteEntries();

const remotesMap = {
  ViteApp: { url: 'http://localhost:5173/assets/vite-entry.js', format: 'esm' },
};
initializeViteFederation('RspackApp', 'default', remotesMap);

/* eslint-enable no-undef */

function App() {
  return (
    <div>
      <div>
        <Counter />
      </div>
      <div>
        <AsyncComponent remote="WebpackApp" module="WebpackCounter" />
      </div>
      <div>
        <AsyncComponent
          remote="WebpackNativeApp"
          module="WebpackNativeCounter"
        />
      </div>
      <div>
        <AsyncComponent remote="ViteApp" module="ViteCounter" />
      </div>
    </div>
  );
}

export default App;
