import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../services/actions/ingredients';

export const useGetIngredients = () => {
  const dispatch = useDispatch();
  const {
    ingredientsError,
  } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return ingredientsError;
};