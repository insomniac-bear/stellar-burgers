import { FC } from 'react';
import Title from "../components/title/title";
import styles from './404.module.css';

export const Page404: FC = () => {
  return (
    <main className="page">
      <Title tag='h1' className={styles.title}>404</Title>
      <img
        className={styles.icon}
        src='/astronauts.png'
        alt='Page not found'
      />
      <p className={`${styles.text} text text_type_main-medium`}>Извините! Страница не найдена...</p>
    </main>
  );
};
