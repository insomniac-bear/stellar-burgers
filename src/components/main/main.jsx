import BurgerIngridients from '../burger-ingredients/burger-ingridients';
import mainStyles from './main.module.css';

const Main = () => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngridients />
    </main>
  );
}

export default Main;