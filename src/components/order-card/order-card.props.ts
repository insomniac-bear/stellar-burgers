export interface IOrderCardProps {
  id: string;
  ingredientIdList: string[];
  name: string;
  number: number;
  created: string;
  status?: "done" | "created" | "pending";
}
