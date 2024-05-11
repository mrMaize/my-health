import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { IAuthState } from './reducer';

// simple selectors
// const useIsAuth = () => useSelector(isAuthSelector);
const useIsAuth = () =>
  useSelector((state: { auth: IAuthState }) => state.auth.isAuth);

const useSelectAuth_ = (state: { auth: IAuthState }) => state.auth;

// create selector usage
const useSelectAuth = () =>
  createSelector((state: { auth: IAuthState }) => state, useSelectAuth_);

export { useIsAuth, useSelectAuth };
