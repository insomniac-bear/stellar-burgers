import PropTypes from 'prop-types';
import propertyStyles from './ingridient-property.module.css';

const IngridientProperty = ({ property, value }) => {
  return(
    <li className={propertyStyles.item}>
      <p className='text text_type_main-default mb-2'>{property}</p>
      <p className='text text_type_digits-medium'>{value}</p>
  </li>
  );
};

IngridientProperty.propTypes = {
  property: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default IngridientProperty;