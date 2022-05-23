import PropTypes from 'prop-types';
import propertyStyles from './ingredient-property.module.css';

const ingredientProperty = ({ property, value }) => {
  return(
    <li className={propertyStyles.item}>
      <p className='text text_type_main-default mb-2'>{property}</p>
      <p className='text text_type_digits-medium'>{value}</p>
  </li>
  );
};

ingredientProperty.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default ingredientProperty;