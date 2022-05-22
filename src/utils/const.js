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

export const OrderActionTypes = {
  ADD: 'ADD',
  DEL: 'DEL',
  SET_ORDER: 'SET_ORDER',
  CLEAR: 'CLEAR',
  SET_ERROR: 'SET_ERROR',
  SET_LOADING: 'SET_LOADING',
}

export const ingredientDataTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
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

export const BASE_URL = 'https://norma.nomoreparties.space/api';
