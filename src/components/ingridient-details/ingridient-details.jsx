import { ingridientDataTypes } from '../../utils/const';
import detailsStyles from './ingridient-details.module.css';

const IngridientDetails = ({ ingridient }) => {
  return(
    <div className={detailsStyles.container}>
      <img src={ingridient.image_large} className={'mb-4'} alt={ingridient.name} />
      <p className={`${detailsStyles.name} text text_type_main-medium mb-8`}>{ingridient.name}</p>
      <ul className={detailsStyles.list}>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Калории, ккал</p>
          <p className='text text_type_digits-medium'>{ingridient.calories}</p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Белки, г</p>
          <p className='text text_type_digits-medium'>{ingridient.proteins}</p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Жиры, г</p>
          <p className='text text_type_digits-medium'>{ingridient.fat}</p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-medium'>{ingridient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

IngridientDetails.propTypes = {
  ingridient: ingridientDataTypes.isRequired
}

export default IngridientDetails;
