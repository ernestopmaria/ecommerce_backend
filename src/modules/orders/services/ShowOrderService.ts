import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';

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
