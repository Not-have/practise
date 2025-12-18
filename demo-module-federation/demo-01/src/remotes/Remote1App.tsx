// ./src/remotes/Remote1App.tsx
import { createRemoteAppComponent } from '@module-federation/bridge-react';
import { loadRemote } from '@module-federation/runtime';
import { LoadingComponent, ErrorFallback } from '../components/RemoteComponents';

export const Remote1App = createRemoteAppComponent({
  loader: () => loadRemote('remote1/export-app'),
  loading: <LoadingComponent />,
  fallback: ErrorFallback,
});
