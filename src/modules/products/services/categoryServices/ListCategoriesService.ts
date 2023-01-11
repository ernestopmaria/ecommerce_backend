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

	public async execute(): Promise<ICategory[] | null> {
		const category = await this.categoryRepository.findAll();

		return category;
	}
}

export default ListCategoryService;
