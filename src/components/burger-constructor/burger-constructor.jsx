import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../services/order-context';
import { OrderActionTypes } from '../../utils/const';
import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ openOrderDetailsPopup }) => {
  const { orderState, orderDispatcher } = useContext(OrderContext);
  const bun = orderState.bun;
  const main = orderState.main;
  const price = orderState.price;

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
                <li key={index} className={`${constructorStyles.mainItem} mt-4`}>
                  <DragIcon />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                    handleClose={() => orderDispatcher({ type: OrderActionTypes.DEL, payload: { item, index } })}
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
        <Button type='primary' size='medium' onClick={openOrderDetailsPopup}>Оформить заказ</Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  openOrderDetailsPopup: PropTypes.func.isRequired
}

export default BurgerConstructor;