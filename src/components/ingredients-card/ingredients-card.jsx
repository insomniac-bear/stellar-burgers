import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { SELECT_INGREDIENT } from '../../services/actions/ingredients';
import { ingredientDataTypes, OrderActionTypes } from '../../utils/const';
import { OrderContext } from '../../services/order-context';
import cardStyles from './ingredients-card.module.css';

const IngredientsCard = ({ ingredient, openDetailedPopup }) => {
  const { image, name, price } = ingredient;
  const dispatch = useDispatch();
  const { orderDispatcher } = useContext(OrderContext);
  const onCardClick = () => {
    dispatch({
      type: SELECT_INGREDIENT,
      ingredient,
    });
    orderDispatcher({ type: OrderActionTypes.ADD, payload: ingredient });
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
  openDetailedPopup: PropTypes.func.isRequired,
}

export default IngredientsCard;