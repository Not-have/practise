// ./src/remotes/Remote1App.tsx
import { createRemoteAppComponent } from '@module-federation/bridge-react';
import { loadRemote } from '@module-federation/runtime';
import { LoadingComponent, ErrorFallback } from '../components/RemoteComponents';

const Remote1App = createRemoteAppComponent({
  loader: () => loadRemote('remote1/export-app'),
  loading: <LoadingComponent />,
  fallback: ErrorFallback,
});

export default Remote1App;