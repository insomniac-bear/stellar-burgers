import PropTypes from 'prop-types';

export const ItemType = {
  Bun: {
    TYPE: 'bun',
    NAME: 'Булки',
  },
  Main: {
    TYPE: 'main',
    NAME: 'Начинки'
  },
  Sauce: {
    TYPE: 'sauce',
    NAME: 'Соусы'
  }
};

export const ingredientDataTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  uuid: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main','sauce']).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

export const itemDataTypes = PropTypes.shape({
  TYPE: PropTypes.string.isRequired,
  NAME: PropTypes.string.isRequired,
});

export const RequestStatus = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  failed: 'failed',
};

export const OrderStatus = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится'
};

export const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
