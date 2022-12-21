import { IMember } from './member'
import { IStock } from './stock'

export enum POSITION_STATUS {
  CLOSED,
  OPEN,
}

export interface IPosition {
  created_at: string;
  updated_at: string;
  id: number;
  stock: IStock;
  app_user: IMember;
  quantity: number;
  price: number;
  status: POSITION_STATUS;
}
