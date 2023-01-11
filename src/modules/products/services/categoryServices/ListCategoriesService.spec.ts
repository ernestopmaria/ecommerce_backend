import { FakeCategoriesRepository } from '../../domain/repositories/fakes/FakeCategoriesRepository';
import ListCategoryService from '@modules/products/services/categoryServices/ListCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let categoriesServices: ListCategoryService;

describe('Should list categories', () => {
	beforeEach(async () => {
		fakeCategoriesRepository = new FakeCategoriesRepository();
		categoriesServices = new ListCategoryService(fakeCategoriesRepository);
	});
	it(' Should list categories', async () => {
		await fakeCategoriesRepository.create('tecnologia');

		const category = await categoriesServices.execute();
		expect(category).toHaveLength(1);
	});
});
