import PropTypes from 'prop-types';
import IngridientCard from "../ingridients-card/ingridients-card";
import Title from "../title/title";
import { ingridientDataTypes, itemDataTypes } from '../../utils/const';
import listStyles from './ingridients-list.module.css';

const IngridientsList = ({ itemList, itemType, openDetailedPopup }) => {
  return(
    <div className={`${listStyles.container} mb-10`}>
      <Title tag={'h2'} className='mb-6'>{itemType.NAME}</Title>
      <ul className={`${listStyles.list} pr-4 pl-4`}>
        {itemList.map(item =>
          <li key={item._id}>
            <IngridientCard ingridient={item} openDetailedPopup={openDetailedPopup} />
          </li>)
        }
      </ul>
    </div>
  );
}

IngridientsList.propTypes = {
  itemType: PropTypes.shape(
    itemDataTypes.isRequired,
  ).isRequired,
  itemList: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired,
  openDetailedPopup: PropTypes.func.isRequired,
}

export default IngridientsList