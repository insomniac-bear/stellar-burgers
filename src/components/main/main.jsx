import BurgerConstructor from '../burger-constructor/burger-constructor';
import Burgeringredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';

const Main = () => {
  return (
    <main className={mainStyles.main}>
      <Burgeringredients />
      <BurgerConstructor />
    </main>
  );
}

export default Main;
