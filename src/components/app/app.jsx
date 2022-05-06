import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import IngridientDetails from '../ingridient-details/ingridient-details';
import OrderDetails from '../order-deatils/order-details';
import { BASE_URL } from '../../utils/const';
import styles from './app.module.css';

const App = () => {
  const [isIngridientPopupOpened, setIngridientPopupStatus] = useState(false);
  const [isOrderPopupOpened, setOrderPopupStatus] = useState(false);
  const [activeIngridient, setActiveIngridfient] = useState({});
  const [ingridients, setIngridients] = useState({
    isLoading: false,
    hasError: false,
    errorMessage: '',
    data: []
  });

  useEffect(() => {
    getIngridients();
  }, []);

  const getIngridients = () => {
    setIngridients({ ...ingridients, hasError: false, isLoading: true });
    fetch(BASE_URL)
      .then(res => res.json())
      .then(res => setIngridients({ ...ingridients, data: res.data, isLoading: false }))
      .catch(err => {
        setIngridients({ ...ingridients, isLoading: false, hasError: true, errorMessage: err.message })
      });
  };

  const toggleIngridientPopup = () => setIngridientPopupStatus(!isIngridientPopupOpened);
  const toggleOrderPopup = () => setOrderPopupStatus(!isOrderPopupOpened);

  const onIngridientClick = (ingridientCard) => {
    setActiveIngridfient(ingridientCard);
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
        <Modal title={'Что-то пошло не так.'} onEscKeydown={closeErrorPopup} closePopup={closeErrorPopup}>
          <p>Попробуйте перезагрузить страницу</p>
        </Modal>
      }

      {
        !ingridients.isLoading &&
        !ingridients.hasError &&
        <Main
          ingridients={ingridients.data}
          openDetailedPopup={onIngridientClick}
          openOrderDetailsPopup={toggleOrderPopup}
        />
      }

      {
        isIngridientPopupOpened && <Modal title='Детали ингридиента' closePopup={toggleIngridientPopup} onEscKeydown={toggleIngridientPopup}>
          <IngridientDetails ingridient={activeIngridient}/>
        </Modal>
      }

      {
        isOrderPopupOpened && <Modal title='' closePopup={toggleOrderPopup} onEscKeydown={toggleOrderPopup}>
          <OrderDetails />
        </Modal>
      }
    </div>
  );
}

export default App;
