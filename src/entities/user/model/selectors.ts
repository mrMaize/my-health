import { useSelector } from 'react-redux';

import { IUser } from '../../../shared/types/user';

export const useUser = () =>
  useSelector(
    (state: { user: { userData: IUser | null } }) => state.user.userData
  );
