import { ICreateOrder } from './../models/ICreateOrder';
import { IOrder } from '../models/IOrder';
import { IOrderPaginate } from '../models/IOrderPaginate';

export type SearchParams = {
	page: number;
	skip: number;
	take: number;
};
export interface IOrdersRepository {
	findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate>;
	findById(id: string): Promise<IOrder | null>;
	createOrder(data: ICreateOrder): Promise<IOrder>;
}
