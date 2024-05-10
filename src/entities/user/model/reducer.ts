import { userActionTypes } from './actionTypes';

const initialState = {};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case userActionTypes.setUser: {
      const { user } = action.payload;

      return {
        ...state,
        user,
      };
    }

    default:
      return { ...state };
  }
};

export { userReducer };
