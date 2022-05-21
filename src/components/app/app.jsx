import { useState, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-deatils/order-details';
import { getingredients } from '../../utils/utils';
import { orderReducer } from '../../services/order-reducer';
import { OrderContext } from '../../services/order-context';
import styles from './app.module.css';

const App = () => {
  const orderInitialState = {
    bun: null,
    main: [],
    ingredients: [],
    price: 0,
  };

  const [orderState, orderDispatcher] = useReducer(orderReducer, orderInitialState, undefined);
  const [isingredientPopupOpened, setingredientPopupStatus] = useState(false);
  const [isOrderPopupOpened, setOrderPopupStatus] = useState(false);
  const [activeingredient, setActiveingredient] = useState({});
  const [ingredients, setingredients] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    ingredientsData: []
  });

  useEffect(() => {
    getingredients(ingredients, setingredients);
  }, []);

  const toggleingredientPopup = () => setingredientPopupStatus(!isingredientPopupOpened);
  const toggleOrderPopup = () => setOrderPopupStatus(!isOrderPopupOpened);


  const oningredientClick = (ingredientCard) => {
    setActiveingredient(ingredientCard);
    toggleingredientPopup();
  };

  const closeErrorPopup = () => setingredients({ ...ingredients, hasError: false});


  return (
    <div className={styles.app}>
        <AppHeader />

        {
          ingredients.isLoading && <p className={`${styles.message} text text_type_main-large`}>Загружаем ингридиенты...</p>
        }

        {
          ingredients.hasError &&
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
          isingredientPopupOpened && <Modal title='Детали ингридиента' closePopup={toggleingredientPopup} >
            <IngredientDetails ingredient={activeingredient}/>
          </Modal>
        }

        {
          isOrderPopupOpened && <Modal title='' closePopup={toggleOrderPopup} >
            <OrderDetails />
          </Modal>
        }
    </div>
  );
}

export default App;
