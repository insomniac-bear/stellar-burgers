import PropTypes from 'prop-types';

import IngredientsNavigation from '../ingredients-navigation/ingredients-navigation';
import IngredientsList from '../ingredients-list/ingredients-list';
import Title from '../title/title';

import { selectItemsOfType } from '../../utils/utils';
import { ItemType, ingredientDataTypes } from '../../utils/const';

import ingredientsStyles from './burger-ingredients.module.css';


const BurgerIngredients = ({ data, openDetailedPopup }) => {
  const buns = selectItemsOfType(ItemType.Bun.TYPE, data);
  const sauce = selectItemsOfType(ItemType.Sauce.TYPE, data);
  const main = selectItemsOfType(ItemType.Main.TYPE, data);

  return (
    <section className={`${ingredientsStyles.constructor} pt-10`}>
      <Title tag='h1' className={'mb-5'}>Соберите бургер</Title>
      <IngredientsNavigation
        tabs={[
          ItemType.Bun.NAME,
          ItemType.Sauce.NAME,
          ItemType.Main.NAME
        ]}
      />
      <div className={`${ingredientsStyles.ingredients} mt-10`}>
        <IngredientsList itemList={buns} itemType={ItemType.Bun} openDetailedPopup={openDetailedPopup} />
        <IngredientsList itemList={sauce} itemType={ItemType.Sauce} openDetailedPopup={openDetailedPopup} />
        <IngredientsList itemList={main} itemType={ItemType.Main} openDetailedPopup={openDetailedPopup} />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientDataTypes.isRequired).isRequired,
  openDetailedPopup: PropTypes.func.isRequired
}

export default BurgerIngredients;
