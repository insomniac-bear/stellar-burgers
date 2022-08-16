import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { getIngredients } from "../services/actions/ingredients";

export const useGetIngredients = () => {
  const dispatch = useDispatch();
  const { ingredientsRequest } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return ingredientsRequest;
};
