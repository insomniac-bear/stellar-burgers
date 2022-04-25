import BurgerConstructor from '../burger-constructor/burger-constructor';
import mainStyles from './main.module.css';

const Main = () => {
  return (
    <main className={mainStyles.main}>
      <BurgerConstructor />
    </main>
  );
}

export default Main;