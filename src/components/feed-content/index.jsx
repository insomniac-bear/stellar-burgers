import Title from '../title/title';
import FeedList from './feed-list/feed-list';
import styles from './feed-content.module.css';
import FeedInfo from './feed-info/feed-info';

const FeedContent = () => {
  return (
    <div className={styles.content}>
      <Title tag='h2' className={`${styles.title} pt-10`}>Лента заказов</Title>
      <FeedList />
      <FeedInfo />
    </div>
  );
};

export default FeedContent;