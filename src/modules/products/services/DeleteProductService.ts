import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
	id: string;
}

class DeleteProductService {
	public async execute({ id }: IRequest): Promise<void> {
		const productRepository = getCustomRepository(ProductRepository);
		const product = await productRepository.findOne(id);
		if (!product) {
			throw new AppError('Producto não encontrado!');
		}

		const redisCache = new RedisCache();

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');
		await productRepository.remove(product);
	}
}
export default DeleteProductService;
