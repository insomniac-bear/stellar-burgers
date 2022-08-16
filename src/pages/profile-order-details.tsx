import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import FeedOrderDetails from "../components/feed-content/feed-order-details/feed-order-details";
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_START,
} from "../services/constants";
import { getOrders, getWsFeedConnected } from "../services/selectors/index";
import { getCookie } from "../utils/utils";
import styles from "./ingredient.module.css";

export const ProfileOrderDetailsPage: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const isConnected = useSelector(getWsFeedConnected);

  useEffect(() => {
    dispatch({
      type: WS_FEED_CONNECTION_START,
      payload: `?token=${getCookie("token")}`,
    });

    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <main className="page">
      {isConnected && !!orders.length && (
        <div className={styles.container}>
          <FeedOrderDetails />
        </div>
      )}
    </main>
  );
};
