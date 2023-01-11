import { IOrdersRepository, SearchParams } from '../IOrdersRepository';
import { ICreateOrder } from '../../models/ICreateOrder';
import { IOrder } from '../../models/IOrder';
import { IOrderPaginate } from '../../models/IOrderPaginate';
import { randomUUID } from 'node:crypto';

class FakeOrdersRepository implements IOrdersRepository {
	public orders: IOrder[] = [];

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

	async createOrder({ customer, products }: ICreateOrder): Promise<IOrder> {
		const orderSerilazed: IOrder = {
			id: randomUUID(),
			order: 12,
			customer: customer,
			order_products: products.map(e => ({
				id: randomUUID(),
				product_id: e.product_id,
				price: e.price,
				quantity: e.quantity,
			})),
			created_at: new Date(),
			updated_at: new Date(),
		};

		this.orders.push(orderSerilazed);

		return orderSerilazed;
	}
}

export default FakeOrdersRepository;
