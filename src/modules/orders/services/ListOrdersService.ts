import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

class ListOrdersServices {
	public async execute(): Promise<Order[]> {
		const orderRepository = getCustomRepository(OrdersRepository);

		const orders = await orderRepository.find();
		return orders;
	}
}

export default ListOrdersServices;
