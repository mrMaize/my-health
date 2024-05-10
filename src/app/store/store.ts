import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import { rootReducers } from './rootReducer';

const store = createStore(rootReducers, {}, composeWithDevTools());

export default store;
