import { FC } from 'react';
import { useRef } from 'react';
import { useDispatch } from '../../services/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_INGREDIENT, SORT_ORDER, SET_ORDER_ID_LIST } from '../../services/constants';
import itemStyles from './constructor-item.module.css';
import { IIngredient } from '../../utils/types';

interface IConstructorItemProps {
  item: IIngredient;
  index: number;
}

const ConstructorItem: FC<IConstructorItemProps> = ({ item, index }) => {
  const dispatch = useDispatch();
  const elementRef = useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'constructorItem',
    item,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
    end: () => {
      dispatch({
        type: SET_ORDER_ID_LIST,
      })
    }
  });

 const [{ handlerId }, dropRef] = useDrop({
    accept: 'constructorItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: {index: number}) {
      if (!elementRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch({
        type: SORT_ORDER,
        hoverIndex,
        dragIndex
      });
    }

 });

 dragRef(dropRef(elementRef));
  return (
    isDrag
      ? <div />
      : <li
          className={`${itemStyles.mainItem} mt-4 `}
          ref={elementRef}
          data-handler-id={handlerId}
        >
        <DragIcon type='primary' />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
          handleClose={() => dispatch({
            type: REMOVE_INGREDIENT,
            index
          })}
        />
      </li>
  );
};

export default ConstructorItem;