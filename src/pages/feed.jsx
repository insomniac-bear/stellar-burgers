import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FeedContent from "../components/feed-content";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_START } from '../services/actions/feed';

export const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START });

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
