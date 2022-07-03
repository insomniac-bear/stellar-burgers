import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientProperty from '../ingredient-property/ingredient-property';
import detailsStyles from './ingredient-details.module.css';

const IngredientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector(store => store.ingredients.items);
  const ingredient = id ? ingredients.find((item => item._id === id)) : {};

  return(
    <div className={detailsStyles.container}>
      <img src={ingredient.image_large} className={'mb-4'} alt={ingredient.name} />
      <p className={`${detailsStyles.name} text text_type_main-medium mb-8`}>{ingredient.name}</p>
      <ul className={detailsStyles.list}>
        <IngredientProperty property={'Калории, ккал'} value={ingredient.calories} />
        <IngredientProperty property={'Белки, г'} value={ingredient.proteins} />
        <IngredientProperty property={'Жиры, г'} value={ingredient.fat} />
        <IngredientProperty property={'Углеводы, г'} value={ingredient.carbohydrates} />
      </ul>
    </div>
  );
};

export default IngredientDetails;
