import React from 'react';
import Counter from './exposedModules/counter';
import { initRemoteEntries } from './remoteLoader';
import { AsyncComponent } from 'cross-utils';

initRemoteEntries();

function App() {
  return (
    <div>
      <div>
        <Counter />
      </div>
      <div>
        <AsyncComponent remote="RspackApp" module="RspackCounter" />
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
