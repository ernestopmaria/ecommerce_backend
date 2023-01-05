import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import { IDeleteProduct } from '../domain/models/IDeleteProduct';

import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IRedisProvider } from '@shared/cache/RedisCacheProvider/models/IRedisCache';

@injectable()
class DeleteProductService {
	constructor(
		@inject('ProductRepository')
		private productsRepository: IProductsRepository,
		@inject('RedisCache')
		private redisCache: IRedisProvider,
	) {}
	public async execute({ id }: IDeleteProduct): Promise<void> {
		const product = await this.productsRepository.findById(id);
		if (!product) {
			throw new AppError('Producto não encontrado!');
		}

		await this.productsRepository.remove(product);
		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');
	}
}
export default DeleteProductService;
