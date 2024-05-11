import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../../shared/types/user';

type IUserState = {
  userData: null | IUser;
};

const initialState: IUserState = {
  userData: null,
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
