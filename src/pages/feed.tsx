import { useEffect, FC } from 'react';
import { useDispatch } from '../services/hooks';
import FeedContent from "../components/feed-content";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../services/constants';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_FEED_CONNECTION_START,
      payload: '/all'
    });

    return () => {
      console.log('socket was close')
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    }
  },
  [dispatch]);

  return (
    <main className="page">
      <FeedContent />
    </main>
  );
};
