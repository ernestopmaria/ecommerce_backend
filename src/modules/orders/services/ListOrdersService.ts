import redisCache from '@shared/cache/RedisCacheProvider/implementations/RedisCache';
import { IOrder } from '../domain/models/IOrder';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrderPaginate } from '../domain/models/IOrderPaginate';
import { IRedisProvider } from '@shared/cache/RedisCacheProvider/models/IRedisCache';

interface SearchParams {
	page: number;
	limit: number;
}
@injectable()
class ListOrdersServices {
	constructor(
		@inject('OrdersRepository')
		private ordersRepository: IOrdersRepository,
		@inject('RedisCache')
		private redisCache: IRedisProvider,
	) {}
	public async execute({ page, limit }: SearchParams): Promise<IOrderPaginate> {
		const take = limit;
		const skip = (Number(page) - 1) * take;
		let orders = await this.redisCache.recover<IOrderPaginate>(
			'api-vendas-ORDER_LIST',
		);
		if (!orders) {
			orders = await this.ordersRepository.findAll({ page, skip, take });
			await this.redisCache.save('api-vendas-ORDER_LIST', orders);
		}

		return orders;
	}
}

export default ListOrdersServices;
