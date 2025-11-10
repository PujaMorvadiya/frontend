import React, { Suspense, useEffect } from 'react';
import Loaders from './components/Loaders';

const Routes = React.lazy(() => import('./router/routes'));

const App = () => {
  useEffect(() => {
    if (window.top !== window.self && window?.top?.location != null) {
      window.top.location = String(window.location);
    }
  }, []);

  return (
      <Suspense fallback={<Loaders type="SiteLoader" />}>
        <Routes />
      </Suspense>
  );
};

export default App;
