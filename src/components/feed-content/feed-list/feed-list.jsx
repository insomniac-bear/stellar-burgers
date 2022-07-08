import FeedItem from '../feed-item/feed-item';
import styles from './feed-list.module.css';

const FeedList = () => {
  return (
    <ul className={styles.list}>
      <FeedItem />
    </ul>
  );
}

export default FeedList;
