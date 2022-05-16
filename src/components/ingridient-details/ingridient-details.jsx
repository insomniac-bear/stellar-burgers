import IngridientProperty from '../ingridient-property/ingridient-property';
import { ingridientDataTypes } from '../../utils/const';
import detailsStyles from './ingridient-details.module.css';

const IngridientDetails = ({ ingridient }) => {
  return(
    <div className={detailsStyles.container}>
      <img src={ingridient.image_large} className={'mb-4'} alt={ingridient.name} />
      <p className={`${detailsStyles.name} text text_type_main-medium mb-8`}>{ingridient.name}</p>
      <ul className={detailsStyles.list}>
        <IngridientProperty property={'Калории, ккал'} value={ingridient.calories} />
        <IngridientProperty property={'Белки, г'} value={ingridient.proteins} />
        <IngridientProperty property={'Жиры, г'} value={ingridient.fat} />
        <IngridientProperty property={'Углеводы, г'} value={ingridient.carbohydrates} />
      </ul>
    </div>
  );
};

IngridientDetails.propTypes = {
  ingridient: ingridientDataTypes.isRequired
}

export default IngridientDetails;
