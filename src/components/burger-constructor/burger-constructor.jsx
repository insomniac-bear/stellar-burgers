import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../services/orderContext';
import { ingridientDataTypes } from '../../utils/const';
import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ openOrderDetailsPopup }) => {
  const order = useContext(OrderContext);
  const bean = order[0];
  const main = order.slice(1);
  const price = main.reduce((summ, current) => summ + current.price, bean.price);

  return (
    <section className={`${constructorStyles.container} pt-25 pl-4`}>
      <ul className={constructorStyles.list}>
        <li className={`${constructorStyles.item} pl-8 mr-4`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bean.name}
            price={bean.price}
            thumbnail={bean.image_mobile}
          />
        </li>
        <li>
          <ul className={`${constructorStyles.mainIngridientsList} mt-4 pr-4`}>
            {main.map((item, index) => {
              return (
                <li key={index} className={`${constructorStyles.mainItem} mt-4`}>
                  <DragIcon />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                  />
                </li>
              );
            })}
          </ul>
        </li>
        <li className={`${constructorStyles.item} mt-4 mr-4 pl-8`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bean.name}
            price={bean.price}
            thumbnail={bean.image_mobile}
          />
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
  order: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired,
  openOrderDetailsPopup: PropTypes.func.isRequired
}

export default BurgerConstructor;