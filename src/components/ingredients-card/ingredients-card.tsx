import { useMemo, FC } from "react";
import { useSelector } from "../../services/hooks";
import { useLocation, Link } from "react-router-dom";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import cardStyles from "./ingredients-card.module.css";
import { IIngredient } from "../../utils/types";

const IngredientsCard: FC<{ ingredient: IIngredient }> = ({ ingredient }) => {
  const location = useLocation();
  const { image, name, price } = ingredient;
  const { order } = useSelector((store) => store.order);

  const count = useMemo(
    () =>
      ingredient.type !== "bun" && order.main.length
        ? order.main.filter((it) => it._id === ingredient._id).length
        : !!order.bun && order.bun._id === ingredient._id
        ? 2
        : 0,
    [order, ingredient._id, ingredient.type]
  );

  const [, ingredientRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
  });

  return (
    <Link
      className={cardStyles.link}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
    >
      <article className={cardStyles.card} ref={ingredientRef}>
        {!!count && <Counter count={count} size="default" />}
        <img className="pl-4 pr-4" src={image} alt={name} />
        <p
          className={`${cardStyles.price} text text_type_digits-default mt-1 mb-1`}
        >
          {price} <CurrencyIcon type="primary" />
        </p>
        <h3 className={`${cardStyles.title} text text_type_main-default`}>
          {name}
        </h3>
      </article>
    </Link>
  );
};

export default IngredientsCard;
