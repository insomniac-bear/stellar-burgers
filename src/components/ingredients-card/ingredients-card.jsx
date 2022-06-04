import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { SELECT_INGREDIENT } from '../../services/actions/ingredients';
import { ingredientDataTypes } from '../../utils/const';
import cardStyles from './ingredients-card.module.css';

const IngredientsCard = ({ ingredient }) => {
  const { image, name, price } = ingredient;
  const dispatch = useDispatch();
  const { order } =useSelector(store => store.order);

  const count = useMemo(() => ingredient.type !== 'bun' && order.main.length
  ? order.main.filter(it => it._id === ingredient._id).length
  : !!order.bun && order.bun._id === ingredient._id
  ? 2
  : 0, [order, ingredient._id, ingredient.type]);

  const onCardClick = () => {
    dispatch({
      type: SELECT_INGREDIENT,
      ingredient,
    });
  };

  const [, ingredientRef] = useDrag({
    type: 'ingredient',
    item: { ingredient },
  });

  return (
    <article className={cardStyles.card} onClick={onCardClick} ref={ingredientRef}>
      {!!count && <Counter count={count} size="default" />}
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