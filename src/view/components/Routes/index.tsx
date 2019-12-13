import React, { FunctionComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ROUTES } from 'constants/routesPaths';
import synonymsConnector from 'view/connectors/synonyms';
import { SimpleTextEditor } from 'view/pages/SimpleTextEditor';
import { NotFound } from 'view/pages/NotFound';

const SimpleTextEditorWithSynonyms = synonymsConnector(SimpleTextEditor);

export const Routes: FunctionComponent = () => (
  <Switch>
    <Redirect exact from={ROUTES.root} to={ROUTES.simpleTextEditor} />

    <Route
      path={ROUTES.simpleTextEditor}
      component={SimpleTextEditorWithSynonyms}
    />

    <Route component={NotFound} />
  </Switch>
);

Routes.displayName = 'Routes';
