import { ProductRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import AppError from '@shared/errors/AppError';

interface IRequest {
	id: string;
	name: string;
	price: number;
	quantity: number;
}
class UpdateProductService {
	public async execute({
		id,
		name,
		price,
		quantity,
	}: IRequest): Promise<Product> {
		const productRepository = getCustomRepository(ProductRepository);

		const product = await productRepository.findOne(id);
		if (!product) {
			throw new AppError('Producto não encontrado!');
		}
		const existProduct = await productRepository.findByName(name);

		if (existProduct && name !== product.name) {
			throw new AppError('Já existe um producto com este nome');
		}
		(product.name = name),
			(product.price = price),
			(product.quantity = quantity);

		await productRepository.save(product);

		return product;
	}
}

export default UpdateProductService;
