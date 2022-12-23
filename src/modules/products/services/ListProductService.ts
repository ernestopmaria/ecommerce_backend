import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Products';
import redisCache from '@shared/cache/RedisCache';

class ListProductService {
	public async execute(): Promise<Product[]> {
		const productRepository = getCustomRepository(ProductRepository);

		let products = await redisCache.recover<Product[]>(
			'api-vendas-PRODUCT_LIST',
		);
		if (!products) {
			products = await productRepository.find();
			await redisCache.save('api-vendas-PRODUCT_LIST', products);
		}

		return products;
	}
}

export default ListProductService;
