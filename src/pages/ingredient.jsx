import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import Title from "../components/title/title";
import styles from './ingredient.module.css';

export const IngredientPage = () => {
  const { id } = useParams();
  const ingredients = useSelector(store => store.ingredients.items);
  const ingredient = ingredients.find(item => item._id === id);
  return (
    <main className="page">
      <div className={styles.container}>
        <Title tag='h1' className={styles.title}>Детали ингредиента</Title>
        {ingredients.length && <IngredientDetails ingredient={ingredient} />}
      </div>
    </main>
  );
};
