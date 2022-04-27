import PropTypes from 'prop-types';

import IngridientsNavigation from '../ingridients-navigation/ingridients-navigation';
import IngridientsList from '../ingridients-list/ingridients-list';
import Title from '../title/title';

import { selectItemsOfType } from '../../utils/utils';
import { ItemType } from '../../utils/const';

import ingridientsStyles from './burger-ingridients.module.css';


const BurgerIngridients = (props) => {
  const buns = selectItemsOfType(ItemType.Bun.TYPE, props.data);
  const sauce = selectItemsOfType(ItemType.Sauce.TYPE, props.data);
  const main = selectItemsOfType(ItemType.Main.TYPE, props.data);

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
        <IngridientsList itemList={buns} itemType={ItemType.Bun} />
        <IngridientsList itemList={sauce} itemType={ItemType.Sauce} />
        <IngridientsList itemList={main} itemType={ItemType.Main} />
      </div>
    </section>
  );
}

BurgerIngridients.propTypes ={
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(['bun', 'main','sauce']),
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }))
}

export default BurgerIngridients;
