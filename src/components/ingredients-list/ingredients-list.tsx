import { FC } from "react";
import { IIngredient } from "../../utils/types";
import IngredientCard from "../ingredients-card/ingredients-card";
import listStyles from './ingredients-list.module.css';

interface IIngredientsList {
  itemList: IIngredient[];
  itemType: {
    NAME: string;
    TYPE: string;
  };
  idTag: string;
  categoryRef: any;
};

const IngredientsList: FC<IIngredientsList> = ({ itemList, itemType, idTag, categoryRef }) => {
  return(
    <div className={`${listStyles.container} mb-10`}>
      <h2 id={idTag} className='text text_type_main-medium mb-6'>{itemType.NAME}</h2>
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

export default IngredientsList