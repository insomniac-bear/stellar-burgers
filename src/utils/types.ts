export type TIngredient = 'bun' | 'main' | 'sauce';

export interface IIngredient {
  _id: string;
  uuid?: string;
  name: string;
  type: TIngredient;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TRequestStatus = 'idle' | 'pending' | 'success' | 'failed';
