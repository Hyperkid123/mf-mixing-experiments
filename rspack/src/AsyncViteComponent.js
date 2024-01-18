import React, { Suspense } from 'react';

const loadModule = async () => {
  // eslint-disable-next-line no-undef
  await __federation__.ensure('ViteApp');
  // eslint-disable-next-line no-undef
  const c = await window.remotesMap.ViteApp.lib.get('./ViteCounter');
  console.log({ c: c() });
  return c();
};

const AsyncViteComponent = () => {
  const Component = React.lazy(loadModule);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component />
    </Suspense>
  );
};

export default AsyncViteComponent;
