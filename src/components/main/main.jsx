import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingredients/burger-ingridients';
import mainStyles from './main.module.css';
import { data } from '../../utils/data'
import { order } from '../../utils/order';
const Main = () => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngridients data={data}/>
      <BurgerConstructor order={order} />
    </main>
  );
}

export default Main;