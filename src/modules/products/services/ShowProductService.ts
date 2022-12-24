import { IShowProduct } from './../domain/models/IShowProduct';

import AppError from '@shared/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ShowProductService {
	constructor(
		@inject('ProductRepository')
		private productRepository: IProductsRepository,
	) {}

	public async execute({ id }: IShowProduct): Promise<IProduct> {
		const product = await this.productRepository.findById(id);
		if (!product) {
			throw new AppError('Producto não encontrado!');
		}
		return product;
	}
}
export default ShowProductService;
