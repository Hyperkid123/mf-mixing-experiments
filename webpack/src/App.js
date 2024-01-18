import React from 'react';
import Counter from './exposedModules/counter';
import { initRemoteEntries } from './remoteLoader';
import AsyncComponent from './AsyncComponent';

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
    </div>
  );
}

export default App;
