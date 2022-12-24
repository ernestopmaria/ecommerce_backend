import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProduct } from './ICreateOrderProduct';

export interface ICreateOrder {
	customer: ICustomer;
	products: ICreateOrderProduct[];
}
