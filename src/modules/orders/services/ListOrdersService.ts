import redisCache from '@shared/cache/RedisCache';
import { IOrder } from '../domain/models/IOrder';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
@injectable()
class ListOrdersServices {
	constructor(
		@inject('OrdersRepository')
		private ordersRepository: IOrdersRepository,
	) {}
	public async execute(): Promise<IOrder[]> {
		let orders = await redisCache.recover<IOrder[]>('api-vendas-ORDER_LIST');
		if (!orders) {
			orders = await this.ordersRepository.findAll();
			await redisCache.save('api-vendas-ORDER_LIST', orders);
		}

		return orders;
	}
}

export default ListOrdersServices;
