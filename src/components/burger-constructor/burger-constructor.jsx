import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useDrop } from 'react-dnd';

import ConstructorItem from '../constructor-item/constructor-item';

import {
  postOrder,
  ADD_INGREDIENT,
  SET_ORDER_ID_LIST
} from '../../services/actions/order';
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

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient,
      });
      dispatch({
        type: SET_ORDER_ID_LIST
      })
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  return (
    <section className={`${constructorStyles.container} pt-25 pl-4`}>
      <ul className={`${constructorStyles.list} ${isHover && constructorStyles.list_type_isHover}`} ref={dropTarget}>
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
          {
            main && <ul className={`${constructorStyles.mainingredientsList} mt-4 pr-4`}>
              {
                main.map((item, index) => <ConstructorItem key={nanoid()} item={item} index={index}/>)
              }
            </ul>
          }
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
