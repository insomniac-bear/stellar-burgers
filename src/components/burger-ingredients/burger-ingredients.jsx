import { useSelector } from 'react-redux';

import IngredientsNavigation from '../ingredients-navigation/ingredients-navigation';
import IngredientsList from '../ingredients-list/ingredients-list';
import Title from '../title/title';
import Preloader from '../preloader/preloader';

import { selectItemsOfType } from '../../utils/utils';
import { ItemType } from '../../utils/const';

import ingredientsStyles from './burger-ingredients.module.css';


const BurgerIngredients = () => {
  const ingredients = useSelector(store => store.ingredients.items);
  const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest);

  const buns = selectItemsOfType(ItemType.Bun.TYPE, ingredients);
  const sauce = selectItemsOfType(ItemType.Sauce.TYPE, ingredients);
  const main = selectItemsOfType(ItemType.Main.TYPE, ingredients);

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
      {
        ingredientsRequest && <Preloader />
      }

      {
        ingredients.length > 0
        && <div className={`${ingredientsStyles.ingredients} mt-10`}>
          <IngredientsList itemList={buns} itemType={ItemType.Bun} />
          <IngredientsList itemList={sauce} itemType={ItemType.Sauce} />
          <IngredientsList itemList={main} itemType={ItemType.Main} />
        </div>
      }
    </section>
  );
}

export default BurgerIngredients;
