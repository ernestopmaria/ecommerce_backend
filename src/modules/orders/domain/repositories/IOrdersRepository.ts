import { ICreateOrder } from './../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface IOrdersRepository {
	findAll(): Promise<IOrder[]>;
	findById(id: string): Promise<IOrder | undefined>;
	createOrder(data: ICreateOrder): Promise<IOrder>;
}
