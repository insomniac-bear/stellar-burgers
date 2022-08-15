import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useDrop } from 'react-dnd';

import ConstructorItem from '../constructor-item/constructor-item';

import { postOrder } from '../../services/actions/order';
import {
  ADD_INGREDIENT,
  SET_ORDER_ID_LIST
} from '../../services/constants';
import constructorStyles from './burger-constructor.module.css';
import Preloader from '../preloader/preloader';
import { IIngredient } from '../../utils/types';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { order, orderIngredientsId, orderIngredientsIdRequest } = useSelector(store => store.order);
  const { isAuth } = useSelector(store => store.user);

  const bun = order.bun;
  const main = order.main;
  const price = useSelector(store => store.order.price);

  const handleOrderButton = () => {
    isAuth && dispatch(postOrder(orderIngredientsId));
    !isAuth && history.replace({
      pathname: '/login',
      state: {
        from: {
          pathname: '/'
        }
      }
    });
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }: { ingredient: IIngredient }) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: {
          ...ingredient,
          uuid: nanoid()
        },
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
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />}
        </li>
        <li>
          {
            main && <ul className={`${constructorStyles.mainingredientsList} mt-4 pr-4`}>
              {
                main.map((item, index) => <ConstructorItem key={item.uuid} item={item} index={index}/>)
              }
            </ul>
          }
        </li>
        <li className={`${constructorStyles.item} mt-4 mr-4 pl-8`}>
          {bun && <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />}
        </li>
      </ul>
      <div className={`${constructorStyles.controls} mt-10`}>
        <p className='text text_type_digits-medium mr-10'>{price} <CurrencyIcon type='primary' /></p>
        {
          orderIngredientsIdRequest !== 'pending' && <Button
            type='primary'
            size='medium'
            onClick={handleOrderButton}
            disabled={!bun || !main.length}
          >
            Оформить заказ
          </Button>
        }
        {
          orderIngredientsIdRequest === 'pending' && <Preloader />
        }
      </div>
    </section>
  );
};

export default BurgerConstructor;
