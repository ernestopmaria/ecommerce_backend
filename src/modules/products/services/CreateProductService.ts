import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IRedisProvider } from '@shared/cache/RedisCacheProvider/models/IRedisCache';

@injectable()
class CreateProductService {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductsRepository,

		@inject('RedisCache')
		private redisCache: IRedisProvider,
	) {}
	public async execute({
		name,
		price,
		quantity,
	}: ICreateProduct): Promise<IProduct> {
		const existProduct = await this.productRepository.findByName(name);

		if (existProduct) {
			throw new AppError('Já existe um producto com este nome');
		}
		await this.redisCache.invalidate('api-vendas-PRODUCT_LIST');

		const product = this.productRepository.create({
			name,
			price,
			quantity,
		});

		return product;
	}
}
export default CreateProductService;
