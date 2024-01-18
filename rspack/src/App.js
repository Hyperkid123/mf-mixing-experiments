import React from 'react';
import Counter from './exposedModules/counter';
import { initRemoteEntries } from './remoteLoader';
import AsyncComponent from './AsyncComponent';

// Initialize remote containers before rendering
initRemoteEntries();

function App() {
  return (
    <div>
      <div>
        <Counter />
      </div>
      <div>
        <AsyncComponent remote="WebpackApp" module="WebpackCounter" />
      </div>
    </div>
  );
}

export default App;
