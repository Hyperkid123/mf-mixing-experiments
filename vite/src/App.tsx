import { AsyncComponent } from 'cross-utils';
import Counter from './exposedModules/Counter';
import { initRemoteEntries } from './remoteLoader';

initRemoteEntries();

/**
 * Following section is necessary to simulate module federation API for vite
 * The federation API in vite is different from webpack as Rspack
 * Final product will require more robust solution
 */

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
        <AsyncComponent remote="WebpackApp" module="WebpackCounter" />
      </div>
      <div>
        <AsyncComponent
          remote="WebpackNativeApp"
          module="WebpackNativeCounter"
        />
      </div>
    </div>
  );
}

export default App;
