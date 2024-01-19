import { loadRemote } from '@module-federation/runtime';
import { Suspense, lazy, useMemo } from 'react';

const AsyncComponent = ({
  remote,
  module,
}: {
  remote: string;
  module: string;
}) => {
  const Component = useMemo(
    () => lazy(() => loadRemote(`${remote}/${module}`) as Promise<any>),
    [remote, module],
  );
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component />
    </Suspense>
  );
};

export default AsyncComponent;
