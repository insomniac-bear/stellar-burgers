import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { intersection, formatDate } from '../../utils/utils';
import { getIngredients } from '../../services/selectors';
import IngredientImage from '../ingredient-image/ingredient-image';
import styles from './order-card.module.css';
import { OrderStatus } from '../../utils/const';
import { IOrderCardProps } from './order-card.props';

const MAX_SHOWED_INGREDIENTS = 5;

const OrderCard: FC<IOrderCardProps> = ({ id, ingredientIdList, name, number, created, status = undefined }) => {
  const location = useLocation();
  const { url } = useRouteMatch();

  const ingredientsList = useSelector(getIngredients);
  const { bun, ingredientsArr } = intersection(ingredientIdList, ingredientsList);
  const date = formatDate(created);

  const showedIngredientsList = ingredientsArr.length <= MAX_SHOWED_INGREDIENTS
    ? [ ...ingredientsArr ]
    : ingredientsArr.slice(0, MAX_SHOWED_INGREDIENTS);

  const bunPrice = bun?.price ? bun.price * 2 : 0;
  const price = ingredientsArr.reduce((prevValue, item) => prevValue += item.price, bunPrice);

  const unshowedIngredientsCount = ingredientsArr.length - MAX_SHOWED_INGREDIENTS > 0
    ? ingredientsArr.length - MAX_SHOWED_INGREDIENTS
    : 0;

  return (
    <li className={`${styles.item} pt-6 pr-6 pb-6 pl-6 mb-4`}>
      <Link
        className={styles.link}
        to={{
          pathname: `${url}/${id}`,
          state: { background: location }
        }}
      >
          <p className={`${styles.number} text text_type_main-default`}>#{number}</p>
          <time className={`${styles.time} text text_type_main-default`}>{date}</time>
          <h3 className={`${styles.title} text text_type_main-medium mt-6`}>{name}</h3>
          {status && <p className='text text_type_main-default mt-2'>{OrderStatus[status]}</p>}
          <ul className={`${styles.ingredients_list} mt-6`}>
            {
              bun?._id && <li
                className={styles.ingredients_item}
                style={{
                  zIndex: ingredientsArr.length + 2,
                }}
              >
                <IngredientImage
                  ingredientUrl={bun.image_mobile}
                  ingredientName={bun.name}
                  unshowedIngredientsCount={unshowedIngredientsCount}
                  isCountShow={false}
                />
              </li>
            }
            {
              !!showedIngredientsList.length && showedIngredientsList.map((ingredient, index) =>
                (
                  <li
                    key={nanoid()}
                    className={styles.ingredients_item}
                    style={{
                      zIndex: ingredientsArr.length + 1 - index,
                    }}
                  >
                    <IngredientImage
                      ingredientUrl={ingredient.image_mobile}
                      ingredientName={ingredient.name}
                      unshowedIngredientsCount={unshowedIngredientsCount}
                      isCountShow={showedIngredientsList.length - 1 === index}
                    />
                  </li>
                )
              )
            }
          </ul>
          <p className={`${styles.price} text text_type_main-medium`}>{price} <CurrencyIcon type='primary' /></p>
      </Link>
    </li>
  );
};

export default OrderCard;
