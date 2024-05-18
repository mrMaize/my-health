import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import localStorageManager from '../../../shared/localStorage/localStorageManager';
import { REFRESH_TOKEN_LS_KEY } from '../constants';

interface IAuthState {
  isAuth: boolean;
}

const initialState: IAuthState = {
  isAuth: localStorageManager.getValue(REFRESH_TOKEN_LS_KEY, false),
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth: (state, action: PayloadAction<IAuthState['isAuth']>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setUserAuth } = authReducer.actions;
export default authReducer.reducer;

export type { IAuthState };
