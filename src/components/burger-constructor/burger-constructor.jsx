import ConstructorNavigation from '../constructor-navigation/constructor-navigation';
import IngridientsList from '../ingridients-list/ingridients-list';
import Title from '../title/title';

import { data } from '../../utils/data';
import { selectItemsOfType } from '../../utils/utils';
import { ItemType } from '../../utils/const';

import constructorStyles from './burger-constructor.module.css';

const buns = selectItemsOfType(ItemType.Bun.TYPE, data);
const sauce = selectItemsOfType(ItemType.Sauce.TYPE, data);
const main = selectItemsOfType(ItemType.Main.TYPE, data);

const BurgerConstructor = () => {
  return (
    <section className={`${constructorStyles.constructor} pt-10`}>
      <Title tag='h1' className={'mb-5'}>Соберите бургер</Title>
      <ConstructorNavigation
        tabs={[
          ItemType.Bun.NAME,
          ItemType.Sauce.NAME,
          ItemType.Main.NAME
        ]}
      />
      <div className={`${constructorStyles.ingridients} mt-10`}>
        <IngridientsList itemList={buns} itemType={ItemType.Bun} />
        <IngridientsList itemList={sauce} itemType={ItemType.Sauce} />
        <IngridientsList itemList={main} itemType={ItemType.Main} />
      </div>
    </section>
  );
}

export default BurgerConstructor;
