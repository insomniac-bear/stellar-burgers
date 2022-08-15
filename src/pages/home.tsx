import { FC } from 'react';
import { useDispatch, useSelector } from '../services/hooks';

import Main from '../components/main/main';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-deatils/order-details';

import { CLEAR_ORDER } from '../services/constants';

export const HomePage: FC = () => {
  const dispatch = useDispatch();

  const {
    number: orderNumber,
    orderIngredientsIdRequest,
  } = useSelector(store => store.order);

  const closeErrorPopup = () => {
    orderIngredientsIdRequest === 'failed' && dispatch({ type: CLEAR_ORDER })
  };

  return (
    <div className='page'>
      {
       orderIngredientsIdRequest === 'failed' &&
        <Modal title={'Что-то пошло не так.'} closePopup={closeErrorPopup}>
          <p>Попробуйте перезагрузить страницу</p>
        </Modal>
      }

      <Main />

      {
        orderNumber &&
        <Modal
          title=''
          closePopup={() => dispatch({ type: CLEAR_ORDER })}
        >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      }
    </div>
  );
}
