import AppError from '@shared/errors/AppError';
import { ICategory } from '@modules/products/domain/models/ICategory';
import { ICategoriesRepository } from '@modules/products/domain/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListCategoryService {
	constructor(
		@inject('CategoriesRepository')
		private categoryRepository: ICategoriesRepository,
	) {}

	public async execute(): Promise<ICategory[]> {
		const category = await this.categoryRepository.findAll();

		if (!category) {
			throw new AppError('Não há categorias registradas');
		}
		return category;
	}
}

export default ListCategoryService;
