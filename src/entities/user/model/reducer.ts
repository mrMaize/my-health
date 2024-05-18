import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../../shared/types/user';
import localStorageManager from '../../../shared/localStorage/localStorageManager';
import { USER_DATA_LS_KEY } from '../constants';

type IUserState = {
  userData: null | IUser;
};

const initialState: IUserState = {
  userData: localStorageManager.getValue(USER_DATA_LS_KEY),
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState['userData']>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;
export default userReducer.reducer;

export type { IUserState };
