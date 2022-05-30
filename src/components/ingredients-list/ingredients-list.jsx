import PropTypes from 'prop-types';
import IngredientCard from "../ingredients-card/ingredients-card";
import Title from "../title/title";
import { ingredientDataTypes, itemDataTypes } from '../../utils/const';
import listStyles from './ingredients-list.module.css';

const IngredientsList = ({ itemList, itemType }) => {
  return(
    <div className={`${listStyles.container} mb-10`}>
      <Title tag={'h2'} className='mb-6'>{itemType.NAME}</Title>
      <ul className={`${listStyles.list} pr-4 pl-4`}>
        {itemList.map(item =>
          <li key={item._id}>
            <IngredientCard ingredient={item} />
          </li>)
        }
      </ul>
    </div>
  );
}

IngredientsList.propTypes = {
  itemType: itemDataTypes.isRequired,
  itemList: PropTypes.arrayOf(ingredientDataTypes.isRequired).isRequired,
}

export default IngredientsList