import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {
  authUser,
} from '../services/actions/user';
import { getCookie } from '../utils/utils';

export const useAuth = () => {
  const dispatch = useDispatch();

  const {
    authRequest,
    isAuth
  } = useSelector(store => store.user);

  const token = getCookie('token');

  useEffect(() => {
    dispatch(authUser());
  }, [token, dispatch]);

  return { isAuth, authRequest }
};
