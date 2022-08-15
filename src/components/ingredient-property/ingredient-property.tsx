import { FC } from 'react';
import propertyStyles from './ingredient-property.module.css';

const ingredientProperty: FC<{ property: string, value: string }> = ({ property, value }) => {
  return(
    <li className={propertyStyles.item}>
      <p className='text text_type_main-default mb-2'>{property}</p>
      <p className='text text_type_digits-medium'>{value}</p>
  </li>
  );
};

export default ingredientProperty;
