import { nanoid } from 'nanoid';
import AdditionalItem from '../additional-item/additional-item';
import styles from './additional-actions.module.css';

function AdditionalActions ({ additionalItems }) {
  return (
    <ul className={styles.container}>
     {
      additionalItems.map(
        item => (
          <AdditionalItem
            key={nanoid()}
            text={item.text}
            link={item.link}
            linkText={item.linkText}
          />
        )
      )
     }
    </ul>
  );
};

export default AdditionalActions;
