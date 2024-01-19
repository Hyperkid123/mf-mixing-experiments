import { loadRemote } from '@module-federation/runtime';
import React, { Suspense, lazy, useMemo } from 'react';

const AsyncComponent = ({ remote, module }) => {
  const Component = useMemo(
    () => lazy(() => loadRemote(`${remote}/${module}`)),
    [remote, module],
  );
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component />
    </Suspense>
  );
};

export default AsyncComponent;
