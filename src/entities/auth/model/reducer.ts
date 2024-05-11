import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IAuthState {
  isAuth: boolean;
}

const initialState: IAuthState = {
  isAuth: false,
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
