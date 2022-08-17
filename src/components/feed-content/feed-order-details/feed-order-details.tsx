import { useSelector } from "../../../services/hooks";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrders } from "../../../services/selectors";
import { getIngredients } from "../../../services/selectors";
import { formatDate, intersection } from "../../../utils/utils";
import styles from "./feed-order-details.module.css";
import { OrderStatus } from "../../../utils/const";
import IngredientImage from "../../ingredient-image/ingredient-image";
import { nanoid } from "nanoid";

const FeedOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const orders = useSelector(getOrders);
  const order = orders?.find((it) => it._id === id);
  const ingredientsList = useSelector(getIngredients);
  const orderIngredients =
    order && intersection(order.ingredients, ingredientsList);
  const bunPrice =
    orderIngredients?.bun && orderIngredients?.bun.price
      ? orderIngredients?.bun.price * 2
      : 0;
  const price = orderIngredients?.ingredientsArr.reduce(
    (prevValue, item) => (prevValue += item.price),
    bunPrice
  );
  const date = order && formatDate(order.createdAt);
  return (
    <div>
      <header>
        <p className={`${styles.number} text text_type_digits-default`}>
          #{order?.number}
        </p>
        <h3 className="text text_type_main-medium mt-10">{order?.name}</h3>
        <p className={`${styles.status} text text_type_main-default mt-3`}>
          {order && OrderStatus[order.status]}
        </p>
      </header>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <ul className={`${styles.list} mt-6`}>
        {orderIngredients?.bun?._id && (
          <li className={styles.item}>
            <IngredientImage
              ingredientUrl={orderIngredients?.bun?.image_mobile}
              ingredientName={orderIngredients?.bun.name}
              isCountShow={false}
              unshowedIngredientsCount={0}
            />
            <p className={`${styles.name} text text_type_main-default`}>
              {orderIngredients?.bun.name}
            </p>
            <p className={`${styles.price} text text_type_digits-default`}>
              2 x {orderIngredients?.bun.price}&nbsp;
              <CurrencyIcon type="primary" />
            </p>
          </li>
        )}
        {orderIngredients?.ingredientsArr.length &&
          orderIngredients?.ingredientsArr.map((ingredient) => (
            <li className={styles.item} key={nanoid()}>
              <IngredientImage
                ingredientUrl={ingredient.image_mobile}
                ingredientName={ingredient.name}
                isCountShow={false}
                unshowedIngredientsCount={0}
              />
              <p className={`${styles.name} text text_type_main-default`}>
                {ingredient.name}
              </p>
              <p className={`${styles.price} text text_type_digits-default`}>
                1 x {ingredient.price}&nbsp;
                <CurrencyIcon type="primary" />
              </p>
            </li>
          ))}
      </ul>
      <footer className={styles.footer}>
        <time className={`${styles.time} text text_type_main-default`}>
          {date}
        </time>
        <p className={`${styles.price} text text_type_digits-default`}>
          {price}&nbsp; <CurrencyIcon type="primary" />
        </p>
      </footer>
    </div>
  );
};

export default FeedOrderDetails;
