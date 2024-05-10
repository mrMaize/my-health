import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { IAuthState } from './reducer';

const isAuthSelector = (state: { auth: IAuthState }) => state.auth.isAuth;
const tokenSelector = (state: { auth: IAuthState }) => state.auth.token;

// simple selectors
const useIsAuth = () => useSelector(isAuthSelector);
const useAuthToken = () => useSelector(tokenSelector);

const useSelectAuth_ = (state: { auth: IAuthState }) => state.auth;

// create selector usage
const useSelectAuth = () =>
  createSelector((state: { auth: IAuthState }) => state, useSelectAuth_);

export { useIsAuth, useAuthToken, useSelectAuth };
