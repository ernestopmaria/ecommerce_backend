import AppError from '@shared/errors/AppError';
import { ICategory } from '@modules/products/domain/models/ICategory';
import { ICategoriesRepository } from '@modules/products/domain/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCategoryService {
	constructor(
		@inject('CategoriesRepository')
		private categoryRepository: ICategoriesRepository,
	) {}

	public async execute(name: string): Promise<ICategory> {
		const existsCategories = await this.categoryRepository.findByName(name);

		if (existsCategories) {
			throw new AppError('Já existe uma categoria com este nome');
		}
		const category = await this.categoryRepository.create(name);
		return category;
	}
}

export default CreateCategoryService;
