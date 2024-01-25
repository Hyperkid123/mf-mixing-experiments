import React, { useState } from 'react';
import Counter from './exposedModules/counter';
import { AsyncComponent } from 'cross-utils';
import { SharedProvider } from 'shared-package';

import { initRemoteEntries } from './remoteLoader';

// Initialize remote containers before rendering
initRemoteEntries();

/* eslint-enable no-undef */

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
        <h2>
          Examples bellow require running dev servers for each of the shell aps.
        </h2>
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
    </SharedProvider>
  );
}

export default App;
