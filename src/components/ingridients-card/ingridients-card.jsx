import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './ingridients-card.module.css';

const IngridientsCard = (props) => {
  return (
    <article className={cardStyles.card}>
      <Counter count={1} size="default" />
      <img className='pl-4 pr-4' src={props.image} alt={props.name} />
      <p className={`${cardStyles.price} text text_type_digits-default mt-1 mb-1`}>{props.price} <CurrencyIcon /></p>
      <h3 className={`${cardStyles.title} text text_type_main-default`}>{props.name}</h3>
    </article>
  );
}

export default IngridientsCard;