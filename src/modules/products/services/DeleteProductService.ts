import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCacheProvider/implementations/RedisCache';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { inject, injectable } from 'tsyringe';
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

		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');
		await this.productsRepository.remove(product);
	}
}
export default DeleteProductService;
