import { FC } from 'react';
import styles from './feed-status-list.module.css';

interface IFeedStatus {
  type: 'completed' | 'process';
  list: {
    _id: string;
    number: number;
  }[];
};

const FeedStatusList: FC<IFeedStatus> = ({ type, list }) => {

  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} text text_type_main-medium mb-6`}>{type === 'completed' ? 'Готовы:' : 'В работе:'}</h3>
      <ul className={styles.list}>
        {
          list.map(it =>
            <li key={it._id}>
              <p className={`${type === 'completed' && styles.number_active} text text_type_digits-default`}>{it.number}</p>
            </li>
          )
        }
      </ul>
    </div>
  )
};

export default FeedStatusList;
