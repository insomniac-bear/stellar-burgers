import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_INGREDIENT, SORT_ORDER, SET_ORDER_ID_LIST } from '../../services/actions/order';
import { ingredientDataTypes } from '../../utils/const';
import itemStyles from './constructor-item.module.css';

const ConstructorItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const elementRef = useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'constructorItem',
    item: { index },
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
    item,
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!elementRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = elementRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: SORT_ORDER,
        hoverIndex,
        dragIndex
      });
      item.index = hoverIndex;
    }
  });

  dragRef(dropRef(elementRef));
  return (
    !isDrag && <li className={`${itemStyles.mainItem} mt-4 `} ref={elementRef} data-handler-id={handlerId}>
      <DragIcon />
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

ConstructorItem.propTypes = {
  item: ingredientDataTypes.isRequired,
  index: PropTypes.number.isRequired,
}

export default ConstructorItem;