import { useSelector } from "../../services/hooks";
import { nanoid } from "nanoid";
import { getOrders, getWsFeedConnected } from "../../services/selectors";
import OrderCard from "../order-card";
import styles from "./profile-orders.module.css";
import Preloader from "../preloader/preloader";

const ProfileOrders = () => {
  const orders = useSelector(getOrders);
  const isConnected = useSelector(getWsFeedConnected);

  return (
    <ul className={styles.list}>
      {!!orders &&
        orders.map((order) => (
          <OrderCard
            key={nanoid()}
            id={order._id}
            ingredientIdList={order.ingredients}
            name={order.name}
            number={order.number}
            created={order.createdAt}
            status={order.status}
          />
        ))}
      {!isConnected && <Preloader />}
    </ul>
  );
};

export default ProfileOrders;
