import React, { useState } from 'react';
import Counter from './exposedModules/counter';
import { initRemoteEntries } from './remoteLoader';
import { AsyncComponent } from 'cross-utils';
import { SharedProvider } from 'shared-package';

initRemoteEntries();

function App() {
  const [count, setCount] = useState(0);
  return (
    <SharedProvider count={count} setCount={setCount}>
      <div>
        <div>
          <Counter />
        </div>
        <AsyncComponent remote="CollectionRspackApp" module="Input" />
        <AsyncComponent remote="CollectionWebpack" module="Input" />
        <AsyncComponent remote="CollectionViteApp" module="Input" />
        <div>
          <AsyncComponent remote="RspackApp" module="RspackCounter" />
        </div>
        <div>
          <AsyncComponent remote="WebpackApp" module="WebpackCounter" />
        </div>
      </div>
    </SharedProvider>
  );
}

export default App;
