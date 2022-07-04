import IngredientDetails from "../components/ingredient-details/ingredient-details";
import Title from "../components/title/title";
import styles from './ingredient.module.css';

export const IngredientPage = () => {
  return (
    <main className="page">
      <div className={styles.container}>
        <Title tag='h1' className={styles.title}>Детали ингредиента</Title>
        <IngredientDetails />
      </div>
    </main>
  );
};
