import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {
  authUser, updateRefreshToken,
} from '../services/actions/user';
import { getCookie } from '../utils/utils';

export const useAuth = () => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector(store => store.user.data);
  const {
    authRequest,
    authError,
    refreshTokenRequest,
    refreshTokenError,
  } = useSelector(store => store.user);

  const accessToken = getCookie('token');
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (
      !isAuth
      && !!accessToken
      && !authRequest
      && !authError
      && !refreshTokenRequest
      && !refreshTokenError
    ) {
      dispatch(authUser());
    }

    if (
      !isAuth
      && !!refreshToken
      && authError
      && !refreshTokenRequest
      && !refreshTokenError
    ) {
      dispatch(updateRefreshToken());
    }
  }, [
    dispatch,
    isAuth,
    authRequest,
    authError,
    refreshTokenRequest,
    refreshTokenError,
    accessToken,
    refreshToken
  ]);
};