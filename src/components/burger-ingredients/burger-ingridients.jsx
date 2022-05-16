import PropTypes from 'prop-types';

import IngridientsNavigation from '../ingridients-navigation/ingridients-navigation';
import IngridientsList from '../ingridients-list/ingridients-list';
import Title from '../title/title';

import { selectItemsOfType } from '../../utils/utils';
import { ItemType, ingridientDataTypes } from '../../utils/const';

import ingridientsStyles from './burger-ingridients.module.css';


const BurgerIngridients = ({ data, openDetailedPopup }) => {
  const buns = selectItemsOfType(ItemType.Bun.TYPE, data);
  const sauce = selectItemsOfType(ItemType.Sauce.TYPE, data);
  const main = selectItemsOfType(ItemType.Main.TYPE, data);

  return (
    <section className={`${ingridientsStyles.constructor} pt-10`}>
      <Title tag='h1' className={'mb-5'}>Соберите бургер</Title>
      <IngridientsNavigation
        tabs={[
          ItemType.Bun.NAME,
          ItemType.Sauce.NAME,
          ItemType.Main.NAME
        ]}
      />
      <div className={`${ingridientsStyles.ingridients} mt-10`}>
        <IngridientsList itemList={buns} itemType={ItemType.Bun} openDetailedPopup={openDetailedPopup} />
        <IngridientsList itemList={sauce} itemType={ItemType.Sauce} openDetailedPopup={openDetailedPopup} />
        <IngridientsList itemList={main} itemType={ItemType.Main} openDetailedPopup={openDetailedPopup} />
      </div>
    </section>
  );
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired,
  openDetailedPopup: PropTypes.func.isRequired
}

export default BurgerIngridients;
