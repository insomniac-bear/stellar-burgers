import FeedCompletedCount from "../feed-completed-count/feed-completed-count";
import FeedStatusList from "../feed-status-list/feed-status-list";
import styles from './feed-info.module.css';

const completedNumbers = ['034533', '034532', '034530', '034527', '034525'];
const processNumbers = ['034538', '034541', '034542'];

const FeedInfo = () => {
  return (
    <section className={styles.container}>
      <FeedStatusList type='completed' list={completedNumbers} />
      <FeedStatusList type='process' list={processNumbers} />
      <FeedCompletedCount type='onTotal' count={28752}/>
      <FeedCompletedCount type='onToday' count={138}/>
    </section>
  );
};

export default FeedInfo;
