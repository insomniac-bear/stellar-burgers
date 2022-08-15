import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './additional-item.module.css';

interface IAdditionalComponentsProps {
  text: string;
  link: string;
  linkText: string;
}

const AdditionalItem: FC<IAdditionalComponentsProps> = ({ text, link, linkText }) => {
  return(
    <li className='m-4'>
    <p className={`${styles.item} text text_type_main-small`}>
      {text} <Link to={link} className={styles.link}>{linkText}</Link>
    </p>
  </li>
);
}

export default AdditionalItem;