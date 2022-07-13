import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { WS_FEED_CONNECTION_START } from '../../../services/actions/feed';
import { getOrders, getWsFeedConnected } from '../../../services/selectors';
import FeedItem from '../feed-item/feed-item';
import styles from './feed-list.module.css';
import Preloader from '../../preloader/preloader';

const FeedList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const isConnected = useSelector(getWsFeedConnected);

  useEffect(() =>
    dispatch({ type: WS_FEED_CONNECTION_START }),
  [dispatch]);

  return (
    orders.length && <ul className={styles.list}>
      {
        orders.map(order =>
          <FeedItem
            key={nanoid()}
            id={order._id}
            ingredientIdList={order.ingredients}
            name={order.name}
            number={order.number}
            created={order.createdAt}
          />
        )
      }
      {
        !isConnected && <Preloader />
      }
    </ul>
  );
}

export default FeedList;
