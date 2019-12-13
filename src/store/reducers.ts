import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { reducer as synonyms } from './synonyms/reducer';

export default (history: History): Reducer =>
  combineReducers({
    synonyms,
    router: connectRouter(history)
  });
