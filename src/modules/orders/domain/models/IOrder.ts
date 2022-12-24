import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProduct } from './ICreateOrderProduct';

export interface IOrder {
	id: string;
	order: number;
	customer: ICustomer;
	order_products: ICreateOrderProduct[];
	created_at: Date;
	updated_at: Date;
}
