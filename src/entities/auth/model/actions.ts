import { authTypes } from './actionTypes';

const setAuthorized = (payload: boolean) => {
  return {
    type: authTypes.setAuth,
    payload,
  };
};

export { setAuthorized };
