import { FC } from 'react';
import detailsStyles from './order-details.module.css';

const OrderDetails: FC<{orderNumber: number}> = ({ orderNumber }) => {
  return (
    <div className={detailsStyles.container}>
      <p className={`${detailsStyles.number} text text_type_digits-large pt-5 mb-8`}>{orderNumber}</p>
      <p className={`${detailsStyles.main_text} text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <div className={`${detailsStyles.decorate} mb-15`}>
      </div>
      <p className={`${detailsStyles.main_text} text text_type_main-small mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${detailsStyles.sub_text} text text_type_main-small mb-15`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;
