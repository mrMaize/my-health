import { combineReducers } from 'redux';

import userReducer from '../../entities/user/model/reducer';
import authReducer from '../../entities/auth/model/reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export { rootReducers };
