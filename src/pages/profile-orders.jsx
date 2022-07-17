import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ProfileMenu from "../components/profile-menu/profile-menu";
import ProfileOrders from '../components/profile-orders/profile-orders';
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../services/actions/feed';
import { getWsFeedConnected } from '../services/selectors';
import { getCookie } from '../utils/utils';
import styles from './profile.module.css'

export const ProfileOrdersPage = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector(getWsFeedConnected);

  useEffect(() => {
    dispatch({
      type: WS_FEED_CONNECTION_START,
      payload: `?token=${getCookie('token')}`
    });

    return () => {
      dispatch({
        type:WS_FEED_CONNECTION_CLOSED,
      });
    }
  }, [dispatch]);


  return (
    <div className='page'>
      <main className={styles.main}>
        <ProfileMenu />
        {
          isConnected && <ProfileOrders />
        }
      </main>
    </div>
  );
};
