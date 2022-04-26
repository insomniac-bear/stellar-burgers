import ConstructorCard from "../ingridients-card/ingridients-card";
import Title from "../title/title";
import listStyles from './ingridients-list.module.css';

const IngridientsList = ({ itemList, itemType }) => {
  return(
    <div className={`${listStyles.container} mb-10`}>
      <Title tag={'h2'} className='mb-6'>{itemType.NAME}</Title>
      <ul className={`${listStyles.list} pr-4 pl-4`}>
        {itemList.map((item, index) =>
          <li key={index}>
            <ConstructorCard image={item.image} name={item.name} price={item.price} />
          </li>)
        }
      </ul>
    </div>
  );
}

export default IngridientsList