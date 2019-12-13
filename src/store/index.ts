import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';
import history from 'view/history';

export const rootReducer = createRootReducer(history);

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
);
