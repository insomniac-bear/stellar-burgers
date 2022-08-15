import { FC } from 'react';
import { useSelector } from '../../../services/hooks';
import { getTotal, getTotalToday, getOrders } from '../../../services/selectors';
import FeedCompletedCount from "../feed-completed-count/feed-completed-count";
import FeedStatusList from "../feed-status-list/feed-status-list";
import styles from './feed-info.module.css';

const FeedInfo: FC = () => {
  const orders = useSelector(getOrders);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  const completedOrders = orders.length ? orders.filter(order => order.status === 'done') : [];
  const pendingOrders = orders.length ? orders.filter(order => order.status === 'pending') : [];

  return (
    <section className={styles.container}>
      <FeedStatusList type='completed' list={completedOrders} />
      <FeedStatusList type='process' list={pendingOrders} />
      <FeedCompletedCount type='onTotal' count={total}/>
      <FeedCompletedCount type='onToday' count={totalToday}/>
    </section>
  );
};

export default FeedInfo;
