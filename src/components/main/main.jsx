import PropTypes from 'prop-types';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Burgeringredients from '../burger-ingredients/burger-ingredients';
import mainStyles from './main.module.css';
const Main = ({ openDetailedPopup, openOrderDetailsPopup }) => {
  return (
    <main className={mainStyles.main}>
      <Burgeringredients openDetailedPopup={openDetailedPopup} />
      <BurgerConstructor openOrderDetailsPopup={openOrderDetailsPopup} />
    </main>
  );
}

Main.propTypes = {
  openDetailedPopup: PropTypes.func.isRequired,
  openOrderDetailsPopup: PropTypes.func.isRequired
}

export default Main;