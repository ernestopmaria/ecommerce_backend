import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { injectable, inject } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class UpdateProductService {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductsRepository,
	) {}
	public async execute({
		id,
		name,
		price,
		quantity,
	}: IUpdateProduct): Promise<IProduct> {
		const product = await this.productRepository.findById(id);
		if (!product) {
			throw new AppError('Producto não encontrado!');
		}
		const existProduct = await this.productRepository.findByName(name);

		if (existProduct && name !== product.name) {
			throw new AppError('Já existe um producto com este nome');
		}

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');
		(product.name = name),
			(product.price = price),
			(product.quantity = quantity);

		await this.productRepository.save(product);

		return product;
	}
}

export default UpdateProductService;
