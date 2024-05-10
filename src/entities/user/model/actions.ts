import { IUser } from '../../../shared/types/user';

import { userActionTypes } from './actionTypes';

const setUser = (user: IUser) => {
  return {
    type: userActionTypes.setUser,
    user,
  };
};

export { setUser };
