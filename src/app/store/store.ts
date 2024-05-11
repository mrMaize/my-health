// классический вариант redux

// import { legacy_createStore as createStore } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';

// import { rootReducers } from './rootReducer';

// const store = createStore(rootReducers, {}, composeWithDevTools());

// export default store;

// использование readux-toolkit
import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../../entities/user/model/reducer';
import authReducer from '../../entities/auth/model/reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
