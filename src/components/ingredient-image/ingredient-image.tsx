import { FC } from "react";
import styles from "./ingredient-image.module.css";

interface IIngredientImage {
  ingredientUrl: string;
  ingredientName: string;
  unshowedIngredientsCount: number;
  isCountShow: boolean;
}

const IngredientImage: FC<IIngredientImage> = ({
  ingredientUrl,
  ingredientName,
  unshowedIngredientsCount,
  isCountShow,
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={ingredientUrl} alt={ingredientName} />
      {isCountShow && !!unshowedIngredientsCount && (
        <p className={`${styles.counter} text text_type_main-default`}>
          +{unshowedIngredientsCount}
        </p>
      )}
    </div>
  );
};

export default IngredientImage;
