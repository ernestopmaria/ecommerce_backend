import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let fakeRedisCache: FakeRedisCache;
let productService: DeleteProductService;

describe('Create a product', () => {
	beforeEach(() => {
		fakeRedisCache = new FakeRedisCache();
		fakeProductsRepository = new FakeProductsRepository();
		productService = new DeleteProductService(
			fakeProductsRepository,
			fakeRedisCache,
		);
	});

	it('shoul be able to delete a product', async () => {
		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});
		const id = product.id;
		const page = 1;
		const skip = 1;
		const take = 15;

		await productService.execute({ id });
		expect(
			(await fakeProductsRepository.findAll({ page, skip, take })).data,
		).toHaveLength(0);
	});
	it('should throw when product not found', async () => {
		await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});

		const id = '54ab7597-95d7-4dec-948d-teste7dce37399d72';
		expect(productService.execute({ id })).rejects.toBeInstanceOf(AppError);
	});
});
