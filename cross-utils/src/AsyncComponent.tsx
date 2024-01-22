import React, { ErrorInfo, Suspense, lazy, useMemo } from 'react';
import '@module-federation/runtime/types';
import loadModule from './loadModule';

export type AsyncComponentProps = React.PropsWithChildren<{
  remote: string;
  module: string;
}>;

const AsyncComponent = ({ remote, module }: AsyncComponentProps) => {
  const Component = useMemo(
    () => lazy(() => loadModule(remote, module)),
    [remote, module],
  );

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Component />
    </Suspense>
  );
};

type ErrorBoundaryProps = AsyncComponentProps;

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred. Please try again.</div>;
    }
    const props = this.props as AsyncComponentProps;

    return <AsyncComponent {...props} />;
  }
}

export default ErrorBoundary;
