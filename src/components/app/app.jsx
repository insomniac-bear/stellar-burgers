import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { BASE_URL } from '../../utils/const';
import styles from './app.module.css';

const App = () => {
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

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        !ingridients.isLoading &&
        !ingridients.hasError &&
        <Main ingridients={ingridients.data}/>
      }
    </div>
  );
}

export default App;
