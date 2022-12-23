import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
	product_id: string;
	quantity: number;
	price: number;
}

interface IResquest {
	customer: Customer;
	products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
	public async findById(id: string): Promise<Order | undefined> {
		const order = await this.findOne(id, {
			relations: ['order_products', 'customer'],
		});
		return order;
	}

	public async createOrder({ customer, products }: IResquest): Promise<Order> {
		const order = this.create({
			customer,
			order_products: products,
		});
		await this.save(order);

		return order;
	}
}
