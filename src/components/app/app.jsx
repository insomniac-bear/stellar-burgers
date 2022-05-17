import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngridientDetails from '../ingridient-details/ingridient-details';
import OrderDetails from '../order-deatils/order-details';
import { getIngridients } from '../../utils/utils';
import styles from './app.module.css';

const App = () => {
  const [isIngridientPopupOpened, setIngridientPopupStatus] = useState(false);
  const [isOrderPopupOpened, setOrderPopupStatus] = useState(false);
  const [activeIngridient, setActiveIngridient] = useState({});
  const [ingridients, setIngridients] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    ingridientsData: []
  });

  useEffect(() => {
    getIngridients(ingridients, setIngridients);
  }, []);

  const toggleIngridientPopup = () => setIngridientPopupStatus(!isIngridientPopupOpened);
  const toggleOrderPopup = () => setOrderPopupStatus(!isOrderPopupOpened);


  const onIngridientClick = (ingridientCard) => {
    setActiveIngridient(ingridientCard);
    toggleIngridientPopup();
  };

  const closeErrorPopup = () => setIngridients({ ...ingridients, hasError: false});


  return (
    <div className={styles.app}>
        <AppHeader />

        {
          ingridients.isLoading && <p className={`${styles.message} text text_type_main-large`}>Загружаем ингридиенты...</p>
        }

        {
          ingridients.hasError &&
          <Modal title={'Что-то пошло не так.'} closePopup={closeErrorPopup}>
            <p>Попробуйте перезагрузить страницу</p>
          </Modal>
        }

        {
          !ingridients.isLoading &&
          !ingridients.hasError &&
          ingridients.ingridientsData.length &&
          <Main
            ingridients={ingridients.ingridientsData}
            openDetailedPopup={onIngridientClick}
            openOrderDetailsPopup={toggleOrderPopup}
          />
        }

        {
          isIngridientPopupOpened && <Modal title='Детали ингридиента' closePopup={toggleIngridientPopup} >
            <IngridientDetails ingridient={activeIngridient}/>
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
