import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;
