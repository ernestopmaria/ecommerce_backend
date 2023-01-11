import { FakeCategoriesRepository } from '../../domain/repositories/fakes/FakeCategoriesRepository';
import AppError from '@shared/errors/AppError';
import CreateCategoryService from '@modules/products/services/categoryServices/CreateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let categoriesServices: CreateCategoryService;

describe('Create Categories', () => {
	beforeEach(async () => {
		fakeCategoriesRepository = new FakeCategoriesRepository();
		categoriesServices = new CreateCategoryService(fakeCategoriesRepository);
	});
	it(' Should create categories', async () => {
		const name = 'Informatica';

		const category = await categoriesServices.execute(name);
		expect(category).toHaveProperty('id');
	});
	it(' Should throw when categories name exists', async () => {
		await fakeCategoriesRepository.create('informatica');

		const name = 'informatica';
		await expect(categoriesServices.execute(name)).rejects.toBeInstanceOf(
			AppError,
		);
	});
});
