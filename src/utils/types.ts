export type TIngredient = "bun" | "main" | "sauce";

export interface IIngredient {
  _id: string;
  uuid?: string;
  index?: number;
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
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: "done" | "created" | "pending";
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type TRequestStatus = "idle" | "pending" | "success" | "failed";

export interface IUserData {
  email: string;
  password: string;
}

export interface IResetPasswordData {
  password: string;
  token: string;
}

export interface IRegistrationUserData {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export type TInput = {
  name: string;
  value: string;
};
