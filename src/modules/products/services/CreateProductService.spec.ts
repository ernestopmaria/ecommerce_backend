import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeRedisCache: FakeRedisCache;
let productService: CreateProductService;

describe('Create a product', () => {
	beforeEach(() => {
		fakeRedisCache = new FakeRedisCache();
		fakeProductsRepository = new FakeProductsRepository();
		productService = new CreateProductService(
			fakeProductsRepository,
			fakeRedisCache,
		);
	});
	it('should  be able to create a new product', async () => {
		const products = await productService.execute({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});

		expect(products).toHaveProperty('id');
	});
});
