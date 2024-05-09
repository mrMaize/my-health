import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../../shared/storage/reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export { store };
