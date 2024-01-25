import { AsyncComponent } from 'cross-utils';
import Counter from './exposedModules/Counter';
import { initRemoteEntries } from './remoteLoader';
import { SharedProvider } from 'shared-package';
import { useState } from 'react';

initRemoteEntries();

/**
 * Following section is necessary to simulate module federation API for vite
 * The federation API in vite is different from webpack as Rspack
 * Final product will require more robust solution
 */

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
        <div>
          <AsyncComponent
            remote="WebpackNativeApp"
            module="WebpackNativeCounter"
          />
        </div>
      </div>
    </SharedProvider>
  );
}

export default App;
