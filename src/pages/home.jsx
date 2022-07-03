import { useDispatch, useSelector } from 'react-redux';

import Main from '../components/main/main';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-deatils/order-details';

import { CLEAR_ORDER } from '../services/actions/order';

export const HomePage = () => {
  const dispatch = useDispatch();

  const {
    number: orderNumber,
    orderIngredientsError,
  } = useSelector(store => store.order);

  const closeErrorPopup = () => {
    orderIngredientsError && dispatch({ type: CLEAR_ORDER })
  };

  return (
    <div className='page'>
      {
       orderIngredientsError &&
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
