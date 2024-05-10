import { authTypes } from './actionTypes';

interface IAuthState {
  isAuth: boolean;
  token: null | string;
}

interface IAction<T = any> {
  type: string;
  payload: T;
}

const initialState: IAuthState = {
  isAuth: false,
  token: null,
};

const authReducer = (state: IAuthState = initialState, action: IAction) => {
  switch (action.type) {
    case authTypes.setAuth: {
      const { payload } = action;

      return {
        ...state,
        isAuth: payload.isAuth,
        token: payload.token,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export { authReducer };
export type { IAuthState };
