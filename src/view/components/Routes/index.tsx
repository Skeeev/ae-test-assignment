import React, { FunctionComponent, Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ROUTES } from 'constants/routesPaths';
import { Loader } from 'view/components/Loader';

const SimpleTextEditor = lazy(() => import('view/pages/SimpleTextEditor'));
const NotFound = lazy(() => import('view/pages/NotFound'));

export const Routes: FunctionComponent = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Redirect exact from={ROUTES.root} to={ROUTES.simpleTextEditor} />

      <Route path={ROUTES.simpleTextEditor} component={SimpleTextEditor} />

      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

Routes.displayName = 'Routes';
