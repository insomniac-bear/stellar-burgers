import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-item.module.css';

const ingredients = [
  {
    imgSrc: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
  },
  {
    imgSrc: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
  },
  {
    imgSrc: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
  },
  {
    imgSrc: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
  },
  {
    imgSrc: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
  },
  {
    imgSrc: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
  },
];

const FeedItem = () => {
  return (
    <li className={`${styles.item} pt-6 pr-6 pb-6 pl-6`}>
      <p className={`${styles.number} text text_type_main-default`}>#034535</p>
      <time className={`${styles.time} text text_type_main-default`}>Сегодня, 16:20 i-GMT+3</time>
      <h3 className={`${styles.title} text text_type_main-medium`}>Death Star Starship Main бургер</h3>
      <ul className={styles.ingredients_list}>
        {
          ingredients.map((ingredient, index) =>
            (
              <li
                key={index}
                className={styles.ingredients_item}
                style={{
                  zIndex: ingredients.length - index,
                }}
              >
                <img
                  className={styles.ingredients_image}
                  src={ingredient.imgSrc}
                  alt={ingredient.name}
                />
              </li>
            )
          )
        }
      </ul>
      <p className={`${styles.price} text text_type_main-medium`}>480 <CurrencyIcon type='primary' /></p>
    </li>
  );
};

export default FeedItem;