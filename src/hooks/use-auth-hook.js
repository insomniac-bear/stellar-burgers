import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {
  authUser,
} from '../services/actions/user';
import { RequestStatus } from '../utils/const';

export const useAuth = () => {
  const dispatch = useDispatch();

  const {
    authRequest,
    isAuth
  } = useSelector(store => store.user);

  useEffect(() => {
    if (!isAuth && authRequest !== RequestStatus.pending) {
      dispatch(authUser());
    }
  }, [authRequest, isAuth, dispatch]);

  return { isAuth, authRequest }
};
