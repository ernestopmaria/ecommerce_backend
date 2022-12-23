import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Products';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
interface IRequest {
	name: string;
	price: number;
	quantity: number;
}

class CreateProductService {
	public async execute({ name, price, quantity }: IRequest): Promise<Product> {
		const productsRepository = getCustomRepository(ProductRepository);
		const existProduct = await productsRepository.findByName(name);

		if (existProduct) {
			throw new AppError('Já existe um producto com este nome');
		}

		const product = productsRepository.create({
			name,
			price,
			quantity,
		});

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');
		await productsRepository.save(product);
		return product;
	}
}
export default CreateProductService;
