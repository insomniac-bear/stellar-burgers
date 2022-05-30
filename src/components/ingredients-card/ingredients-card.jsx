import { useDispatch } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { SELECT_INGREDIENT } from '../../services/actions/ingredients';
import { ingredientDataTypes } from '../../utils/const';
import cardStyles from './ingredients-card.module.css';
import { ADD_INGREDIENT, SET_ORDER_ID_LIST } from '../../services/actions/order';

const IngredientsCard = ({ ingredient }) => {
  const { image, name, price } = ingredient;
  const dispatch = useDispatch();
  const onCardClick = () => {
    dispatch({
      type: SELECT_INGREDIENT,
      ingredient,
    });
    dispatch({
      type: ADD_INGREDIENT,
      ingredient,
    });
    dispatch({
      type: SET_ORDER_ID_LIST,
    });
  }
  return (
    <article className={cardStyles.card} onClick={onCardClick}>
      <Counter count={1} size="default" />
      <img className='pl-4 pr-4' src={image} alt={name} />
      <p className={`${cardStyles.price} text text_type_digits-default mt-1 mb-1`}>{price} <CurrencyIcon /></p>
      <h3 className={`${cardStyles.title} text text_type_main-default`}>{name}</h3>
    </article>
  );
}

IngredientsCard.propTypes = {
  ingredient: ingredientDataTypes.isRequired,
}

export default IngredientsCard;