import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/const';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingredients/burger-ingridients';
import mainStyles from './main.module.css';
import { order } from '../../utils/order';
const Main = ({ ingridients, openDetailedPopup, openOrderDetailsPopup }) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngridients data={ingridients} openDetailedPopup={openDetailedPopup} />
      <BurgerConstructor order={order} openOrderDetailsPopup={openOrderDetailsPopup} />
    </main>
  );
}

Main.propTypes = {
  ingridients: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired,
  openDetailedPopup: PropTypes.func.isRequired,
  openOrderDetailsPopup: PropTypes.func.isRequired
}

export default Main;