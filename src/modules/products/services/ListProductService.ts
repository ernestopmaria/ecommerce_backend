import redisCache from '@shared/cache/RedisCacheProvider/implementations/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { IProductPaginate } from '../domain/models/IProductPaginate';
import { IRedisProvider } from '@shared/cache/RedisCacheProvider/models/IRedisCache';

interface SearchParams {
	page: number;
	limit: number;
}
@injectable()
class ListProductService {
	constructor(
		@inject('ProductRepository')
		private productsRepository: IProductsRepository,
		@inject('RedisCache')
		private redisCache: IRedisProvider,
	) {}

	public async execute({
		page,
		limit,
	}: SearchParams): Promise<IProductPaginate> {
		const take = limit;
		const skip = (Number(page) - 1) * take;
		let products = await this.redisCache.recover<IProductPaginate>(
			'api-vendas-PRODUCT_LIST',
		);
		if (!products) {
			products = await this.productsRepository.findAll({ page, skip, take });
			await this.redisCache.save('api-vendas-PRODUCT_LIST', products);
		}

		return products;
	}
}

export default ListProductService;
