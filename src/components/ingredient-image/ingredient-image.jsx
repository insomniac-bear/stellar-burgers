import styles from './ingredient-image.module.css';

const IngredientImage = ({
  ingredientUrl,
  ingredientName,
  unshowedIngredientsCount,
  isCountShow,
}) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={ingredientUrl}
        alt={ingredientName}
      />
      {
        isCountShow && !!unshowedIngredientsCount &&
        <p className={`${styles.counter} text text_type_main-default`}>
        +{unshowedIngredientsCount}
        </p>
      }
    </div>
  );
};

export default IngredientImage;
