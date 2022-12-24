import { IOrdersRepository } from './../../../domain/repositories/IOrdersRepository';
import { getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrder } from '@modules/orders/domain/models/IOrder';

export class OrdersRepository implements IOrdersRepository {
	private ormRepository: Repository<Order>;
	constructor() {
		this.ormRepository = getRepository(Order);
	}

	public async findById(id: string): Promise<Order | undefined> {
		const order = await this.ormRepository.findOne(id, {
			relations: ['order_products', 'customer'],
		});
		return order;
	}

	async findAll(): Promise<IOrder[]> {
		return await this.ormRepository.find();
	}

	public async createOrder({
		customer,
		products,
	}: ICreateOrder): Promise<Order> {
		const order = this.ormRepository.create({
			customer,
			order_products: products,
		});
		await this.ormRepository.save(order);

		return order;
	}
}
