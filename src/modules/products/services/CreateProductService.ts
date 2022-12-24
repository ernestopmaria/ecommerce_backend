import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class CreateProductService {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductsRepository,
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
		await redisCache.invalidate('api-vendas-PRODUCT_LIST');

		const product = this.productRepository.create({
			name,
			price,
			quantity,
		});

		return product;
	}
}
export default CreateProductService;
