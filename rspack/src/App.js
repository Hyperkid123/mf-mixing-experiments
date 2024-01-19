import React from 'react';
import Counter from './exposedModules/counter';
import { initRemoteEntries } from './remoteLoader';
import AsyncComponent from './AsyncComponent';

import './viteRemoteLoader';
import AsyncViteComponent from './AsyncViteComponent';

// Initialize remote containers before rendering
initRemoteEntries();

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
        <AsyncViteComponent />
      </div>
    </div>
  );
}

export default App;
