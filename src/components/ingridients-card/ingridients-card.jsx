import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingridientDataTypes} from '../../utils/const'
import cardStyles from './ingridients-card.module.css';

const IngridientsCard = ({ ingridient, openDetailedPopup }) => {
  const { image, name, price } = ingridient;
  return (
    <article className={cardStyles.card} onClick={() => openDetailedPopup(ingridient)}>
      <Counter count={1} size="default" />
      <img className='pl-4 pr-4' src={image} alt={name} />
      <p className={`${cardStyles.price} text text_type_digits-default mt-1 mb-1`}>{price} <CurrencyIcon /></p>
      <h3 className={`${cardStyles.title} text text_type_main-default`}>{name}</h3>
    </article>
  );
}

IngridientsCard.propTypes = {
  ingridient: ingridientDataTypes.isRequired,
  openDetailedPopup: PropTypes.func.isRequired,
}

export default IngridientsCard;