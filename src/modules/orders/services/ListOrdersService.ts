import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import redisCache from '@shared/cache/RedisCache';

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
