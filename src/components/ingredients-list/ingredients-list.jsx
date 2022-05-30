import PropTypes from 'prop-types';
import IngredientCard from "../ingredients-card/ingredients-card";
import Title from "../title/title";
import { ingredientDataTypes, itemDataTypes } from '../../utils/const';
import listStyles from './ingredients-list.module.css';

const IngredientsList = ({ itemList, itemType, idTag, categoryRef }) => {
  return(
    <div id={idTag} className={`${listStyles.container} mb-10`}>
      <Title tag={'h2'} className='mb-6'>{itemType.NAME}</Title>
      <ul className={`${listStyles.list} pr-4 pl-4`} ref={categoryRef}>
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
  idTag: PropTypes.string.isRequired,
  categoryRef: PropTypes.func.isRequired
}

export default IngredientsList