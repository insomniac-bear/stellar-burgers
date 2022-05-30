import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { REMOVE_INGREDIENT, postOrder } from '../../services/actions/order';
import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const order = useSelector(store => store.order.order);
  const ingredientsId = useSelector(store => store.order.orderIngredientsId);
  const bun = order.bun;
  const main = order.main;
  const price = useSelector(store => store.order.price);

  const handleOrderButton = () => {
    dispatch(postOrder(ingredientsId));
  }

  return (
    <section className={`${constructorStyles.container} pt-25 pl-4`}>
      <ul className={constructorStyles.list}>
        <li className={`${constructorStyles.item} pl-8 mr-4`}>
          {bun && <ConstructorElement
            type='top'
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />}
        </li>
        <li>
          {main && <ul className={`${constructorStyles.mainingredientsList} mt-4 pr-4`}>
            {main.map((item, index) => {
              return (
                // Используется nanoid, а не _id ингредиента, т.к. в списке может быть два одинаковых ингредиента с одинаковыми _id
                <li key={nanoid()} className={`${constructorStyles.mainItem} mt-4`}>
                  <DragIcon />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                    handleClose={() => dispatch({
                      type: REMOVE_INGREDIENT,
                      index
                    })}
                  />
                </li>
              );
            })}
          </ul>}
        </li>
        <li className={`${constructorStyles.item} mt-4 mr-4 pl-8`}>
          {bun && <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />}
        </li>
      </ul>
      <div className={`${constructorStyles.controls} mt-10`}>
        <p className='text text_type_digits-medium mr-10'>{price} <CurrencyIcon /></p>
        <Button
          type='primary'
          size='medium'
          onClick={handleOrderButton}
          disabled={!bun || !main.length}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
