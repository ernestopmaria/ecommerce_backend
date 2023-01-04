import { IOrdersRepository, SearchParams } from '../IOrdersRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import { ICreateOrder } from '../../models/ICreateOrder';
import { IOrder } from '../../models/IOrder';
import { IOrderPaginate } from '../../models/IOrderPaginate';
import { randomUUID } from 'node:crypto';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Product from '@modules/products/infra/typeorm/entities/Products';

class FakeOrdersRepository implements IOrdersRepository {
	public orders: Order[] = [];
	public customer: Customer;
	public product: Product[];

	public async findAll({
		page,
		skip,
		take,
	}: SearchParams): Promise<IOrderPaginate> {
		const result = {
			per_page: take,
			total: 1,
			current_page: page,
			data: this.orders,
		};
		return result;
	}

	public async findById(id: string): Promise<IOrder | null> {
		return this.orders.find(c => c.id === id) as unknown as null;
	}

	async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
		let order = this.orders.map((e: Order) => {
			return {
				id: randomUUID(),
				order: this.orders.length,
				customer: customer,
				order_products: this.product.map(() => {
					return {
						products,
					};
				}),
				created_at: e.created_at,
				updated_at: e.updated_at,
			};
		});

		return order as unknown as Order;
	}
}

export default FakeOrdersRepository;
