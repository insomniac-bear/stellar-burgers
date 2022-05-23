import { useState, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-deatils/order-details';
import { getingredients } from '../../services/api';
import { orderInitialState } from '../../services/order-initial-state';
import { orderReducer } from '../../services/order-reducer';
import { OrderContext } from '../../services/order-context';
import { OrderActionTypes } from '../../utils/const';
import styles from './app.module.css';

const App = () => {
  const [orderState, orderDispatcher] = useReducer(orderReducer, orderInitialState, undefined);
  const [isIngredientPopupOpened, setingredientPopupStatus] = useState(false);
  const [isOrderPopupOpened, setOrderPopupStatus] = useState(false);
  const [activeingredient, setActiveingredient] = useState({});
  const [ingredients, setingredients] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    ingredientsData: [],
  });

  useEffect(() => {
    getingredients(ingredients, setingredients);
  }, []);

  const toggleingredientPopup = () => setingredientPopupStatus(!isIngredientPopupOpened);
  const toggleOrderPopup = () => setOrderPopupStatus(!isOrderPopupOpened);


  const oningredientClick = (ingredientCard) => {
    setActiveingredient(ingredientCard);
    toggleingredientPopup();
  };

  const closeErrorPopup = () => {
    if (ingredients.hasError) {
      setingredients({ ...ingredients, hasError: false});
    }
    if (orderState.hasOrderError) {
      orderDispatcher({ type: OrderActionTypes.CLEAR })
    }
  };


  return (
    <div className={styles.app}>
        <AppHeader />

        {
          ingredients.isLoading && <p className={`${styles.message} text text_type_main-large`}>Загружаем ингридиенты...</p>
        }

        {
          (ingredients.hasError || orderState.hasOrderError) &&
          <Modal title={'Что-то пошло не так.'} closePopup={closeErrorPopup}>
            <p>Попробуйте перезагрузить страницу</p>
          </Modal>
        }

        {
          ingredients.ingredientsData.length &&
          <OrderContext.Provider value={{ orderState, orderDispatcher }}>
            <Main
              ingredients={ingredients.ingredientsData}
              openDetailedPopup={oningredientClick}
              openOrderDetailsPopup={toggleOrderPopup}
            />
          </OrderContext.Provider>
        }

        {
          isIngredientPopupOpened && <Modal title='Детали ингридиента' closePopup={toggleingredientPopup} >
            <IngredientDetails ingredient={activeingredient}/>
          </Modal>
        }

        {
          isOrderPopupOpened && orderState.orderNumber && <Modal title='' closePopup={toggleOrderPopup} >
            <OrderDetails orderNumber={orderState.orderNumber} />
          </Modal>
        }
    </div>
  );
}

export default App;
