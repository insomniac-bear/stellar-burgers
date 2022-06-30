import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../components/main/main';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import OrderDetails from '../components/order-deatils/order-details';

import {
  RESET_INGREDIENTS_FAILED,
  CLEAR_SELECTED_INGREDIENT,
  getIngredients
} from '../services/actions/ingredients';
import { CLEAR_ORDER } from '../services/actions/order';

export const HomePage = () => {
  const dispatch = useDispatch();

  const loadingIngredientsFailed = useSelector(store => store.ingredients.ingredientsError);
  const selectedIngredient = useSelector(store => store.ingredients.selectedIngredient);
  const orderNumber = useSelector(store => store.order.number);
  const sendOrderError = useSelector(store => store.order.orderIngredientsIdError);

  useEffect(() => {
    dispatch(getIngredients());
  }, [ dispatch ]);

  const closeErrorPopup = () => {
    if (loadingIngredientsFailed) {
      dispatch({ type: RESET_INGREDIENTS_FAILED });
    }
    if (sendOrderError) {
      dispatch({ type: CLEAR_ORDER })
    }
  };

  return (
    <div className='page'>
      {
        (loadingIngredientsFailed || sendOrderError) &&
        <Modal title={'Что-то пошло не так.'} closePopup={closeErrorPopup}>
          <p>Попробуйте перезагрузить страницу</p>
        </Modal>
      }

      <Main />

      {
        selectedIngredient &&
        <Modal
          title='Детали ингредиента'
          closePopup={() => dispatch({ type: CLEAR_SELECTED_INGREDIENT })}
        >
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      }

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

