import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import IngredientsNavigation from '../ingredients-navigation/ingredients-navigation';
import IngredientsList from '../ingredients-list/ingredients-list';
import Title from '../title/title';
import Preloader from '../preloader/preloader';

import { selectItemsOfType } from '../../utils/utils';
import { ItemType } from '../../utils/const';

import ingredientsStyles from './burger-ingredients.module.css';


const BurgerIngredients = () => {
  const tabs = [
    ItemType.Bun,
    ItemType.Sauce,
    ItemType.Main
  ];
  const [currentTab, setCurrenTab] = useState(ItemType.Bun.TYPE);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: .5 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrenTab(ItemType.Bun.TYPE);
    } else if (inViewMains) {
      setCurrenTab(ItemType.Main.TYPE);
    } else if (inViewSauces) {
      setCurrenTab(ItemType.Sauce.TYPE);
    }
  }, [inViewBuns, inViewSauces, inViewMains]);

  const ingredients = useSelector(store => store.ingredients.items);
  const ingredientsRequest = useSelector(store => store.ingredients.ingredientsRequest);

  const buns = selectItemsOfType(ItemType.Bun.TYPE, ingredients);
  const sauce = selectItemsOfType(ItemType.Sauce.TYPE, ingredients);
  const main = selectItemsOfType(ItemType.Main.TYPE, ingredients);

  const onTabClick = (tab) => {
    setCurrenTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      const scrollIntoViewOptions = { behavior: 'smooth' };
      element.scrollIntoView(scrollIntoViewOptions);
    }
  }

  return (
    <section className={`${ingredientsStyles.constructor} pt-10`}>
      <Title tag='h1' className={'mb-5'}>Соберите бургер</Title>
      <IngredientsNavigation
        tabs={tabs}
        currentTab={currentTab}
        onTabClick={onTabClick}
      />
      {
        ingredientsRequest && <Preloader />
      }

      {
        ingredients.length > 0
        && <div className={`${ingredientsStyles.ingredients} mt-10`}>
          <IngredientsList idTag={ItemType.Bun.TYPE} itemList={buns} itemType={ItemType.Bun} categoryRef={bunsRef} />
          <IngredientsList idTag={ItemType.Sauce.TYPE} itemList={sauce} itemType={ItemType.Sauce} categoryRef={saucesRef} />
          <IngredientsList idTag={ItemType.Main.TYPE} itemList={main} itemType={ItemType.Main} categoryRef={mainsRef} />
        </div>
      }
    </section>
  );
}

export default BurgerIngredients;
