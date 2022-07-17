import PropTypes from 'prop-types';
import styles from './feed-status-list.module.css';

const FeedStatusList = ({ type, list }) => {

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

FeedStatusList.propTypes = {
  type: PropTypes.oneOf(['completed', 'process']).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default FeedStatusList;
