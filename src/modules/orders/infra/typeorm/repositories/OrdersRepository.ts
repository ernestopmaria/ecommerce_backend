import { IOrdersRepository } from './../../../domain/repositories/IOrdersRepository';
import { Repository } from 'typeorm';
import Order from '../entities/Order';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { dataSource } from '@shared/infra/typeorm/index';
import { IOrderPaginate } from '../../../domain/models/IOrderPaginate';
import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';

export class OrdersRepository implements IOrdersRepository {
	private ormRepository: Repository<Order>;
	constructor() {
		this.ormRepository = dataSource.getRepository(Order);
	}

	public async findById(id: string): Promise<Order | null> {
		const order = await this.ormRepository
			.createQueryBuilder('orders')
			.andWhere({ id })
			.leftJoinAndSelect('orders.order_products', 'order_products')
			.leftJoinAndSelect('orders.customer', 'customers')
			.getOne();

		return order;
	}

	async findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate> {
		const [orders, count] = await this.ormRepository
			.createQueryBuilder()
			.skip(skip)
			.take(take)
			.getManyAndCount();

		const result = {
			per_page: take,
			total: count,
			current_page: page,
			data: orders,
		};

		return result;
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
