import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../utils/const';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Burgeringredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
const Main = ({ ingredients, openDetailedPopup, openOrderDetailsPopup }) => {
  return (
    <main className={mainStyles.main}>
      <Burgeringredients data={ingredients} openDetailedPopup={openDetailedPopup} />
      <BurgerConstructor openOrderDetailsPopup={openOrderDetailsPopup} />
    </main>
  );
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientDataTypes.isRequired).isRequired,
  openDetailedPopup: PropTypes.func.isRequired,
  openOrderDetailsPopup: PropTypes.func.isRequired
}

export default Main;