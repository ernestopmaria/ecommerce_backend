import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
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
		await productsRepository.save(product);
		return product;
	}
}
export default CreateProductService;