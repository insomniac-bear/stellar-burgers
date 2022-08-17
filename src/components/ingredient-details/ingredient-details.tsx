import { FC } from "react";
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import IngredientProperty from "../ingredient-property/ingredient-property";
import detailsStyles from "./ingredient-details.module.css";

const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((store) => store.ingredients.items);
  const ingredient = id
    ? ingredients.find((item) => item._id === id)
    : undefined;

  if (!!ingredient && ingredients.length !== 0) {
    return (
      <div className={detailsStyles.container}>
        <img
          src={ingredient.image_large}
          className={"mb-4"}
          alt={ingredient.name}
        />
        <p className={`${detailsStyles.name} text text_type_main-medium mb-8`}>
          {ingredient.name}
        </p>
        <ul className={detailsStyles.list}>
          <IngredientProperty
            property={"Калории, ккал"}
            value={ingredient.calories.toString()}
          />
          <IngredientProperty
            property={"Белки, г"}
            value={ingredient.proteins.toString()}
          />
          <IngredientProperty
            property={"Жиры, г"}
            value={ingredient.fat.toString()}
          />
          <IngredientProperty
            property={"Углеводы, г"}
            value={ingredient.carbohydrates.toString()}
          />
        </ul>
      </div>
    );
  } else {
    return <></>;
  }
};

export default IngredientDetails;
