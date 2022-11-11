import { getCustomRepository } from 'typeorm';
import Order from '@modules/orders/typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	id: string;
}

class ShowOrderService {
	public async execute({ id }: IRequest): Promise<Order> {
		const orderRepository = getCustomRepository(OrdersRepository);

		const order = await orderRepository.findById(id);
		if (!order) {
			throw new AppError('Encomenda não encontrada');
		}

		return order;
	}
}
export default ShowOrderService;
