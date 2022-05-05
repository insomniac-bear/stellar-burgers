import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/const';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingredients/burger-ingridients';
import mainStyles from './main.module.css';
import { order } from '../../utils/order';
const Main = ({ ingridients }) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngridients data={ingridients}/>
      <BurgerConstructor order={order} />
    </main>
  );
}

Main.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired
}

export default Main;