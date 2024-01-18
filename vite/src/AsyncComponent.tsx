// @ts-ignore
import { loadRemote } from '@module-federation/runtime-tools';
import { Suspense, lazy, useMemo } from 'react';

const AsyncComponent = ({
  remote,
  module,
}: {
  remote: string;
  module: string;
}) => {
  const Component = useMemo(
    () =>
      lazy(() =>
        loadRemote(`${remote}/${module}`, {
          resolveShare: (...args: any[]) => {
            console.log('resolveShare', args);
            return args;
          },
        }),
      ),
    [remote, module],
  );
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component />
    </Suspense>
  );
};

export default AsyncComponent;
