import { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-deatils/order-details';

import {
  RESET_INGREDIENTS_FAILED,
  CLEAR_SELECTED_INGREDIENT
} from '../../services/actions/ingredients';

import { orderInitialState } from '../../services/order-initial-state';
import { orderReducer } from '../../services/order-reducer';
import { OrderContext } from '../../services/order-context';
import { OrderActionTypes } from '../../utils/const';
import styles from './app.module.css';
import { getIngredients } from '../../services/actions/ingredients';

const App = () => {
  const dispatch = useDispatch();
  const [orderState, orderDispatcher] = useReducer(orderReducer, orderInitialState, undefined);
  const [isOrderPopupOpened, setOrderPopupStatus] = useState(false);

  const loadingIngredientsFailed = useSelector(store => store.ingredients.ingredientsError);
  const selectedIngredient = useSelector(store => store.ingredients.selectedIngredient);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeErrorPopup = () => {
    if (loadingIngredientsFailed) {
      dispatch({ type: RESET_INGREDIENTS_FAILED });
    }
    if (orderState.hasOrderError) {
      orderDispatcher({ type: OrderActionTypes.CLEAR })
    }
  };


  return (
    <div className={styles.app}>
        <AppHeader />
        {
          (loadingIngredientsFailed || orderState.hasOrderError) &&
          <Modal title={'Что-то пошло не так.'} closePopup={closeErrorPopup}>
            <p>Попробуйте перезагрузить страницу</p>
          </Modal>
        }

          <OrderContext.Provider value={{ orderState, orderDispatcher }}>
            <Main />
          </OrderContext.Provider>

        {
          selectedIngredient &&
          <Modal
            title='Детали ингридиента'
            closePopup={() => dispatch({ type: CLEAR_SELECTED_INGREDIENT })}
          >
            <IngredientDetails ingredient={selectedIngredient} />
          </Modal>
        }

        {
          isOrderPopupOpened && orderState.orderNumber && <Modal title=''>
            <OrderDetails orderNumber={orderState.orderNumber} />
          </Modal>
        }
    </div>
  );
}

export default App;
