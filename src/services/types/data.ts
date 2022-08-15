import { IIngredient } from "../../utils/types";

export interface IRefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export interface IIngredientsRequest {
  data: IIngredient[];
};

export interface ISendOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export interface IAuthResponse {
  success: string;
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
};

export interface IInformationResponse {
  success: string;
  message: string;
}

export interface IUpdateUserResponse {
  success: string;
  user: {
    name: string;
    email: string;
  };
};
