import { getCustomRepository } from 'typeorm';

import redisCache from '@shared/cache/RedisCache';

import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import Order from '../infra/typeorm/entities/Order';

class ListOrdersServices {
	public async execute(): Promise<Order[]> {
		const orderRepository = getCustomRepository(OrdersRepository);

		let orders = await redisCache.recover<Order[]>('api-vendas-ORDER_LIST');
		if (!orders) {
			orders = await orderRepository.find();
			await redisCache.save('api-vendas-ORDER_LIST', orders);
		}

		return orders;
	}
}

export default ListOrdersServices;
