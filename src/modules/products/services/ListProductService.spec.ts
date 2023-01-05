import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import ListProductService from './ListProductService';

let fakeProductRepository: FakeProductsRepository;
let productService: ListProductService;
let fakeRediscache: FakeRedisCache;

describe('List product', () => {
	beforeEach(async () => {
		fakeProductRepository = new FakeProductsRepository();
		fakeRediscache = new FakeRedisCache();
		productService = new ListProductService(
			fakeProductRepository,
			fakeRediscache,
		);
	});

	it('should return a customer ', async () => {
		const page = 1;
		const limit = 15;
		await fakeProductRepository.create({
			name: 'cebola',
			price: 2000,
			quantity: 50,
		});
		const product = (await productService.execute({ page, limit })).data;
		expect(product).toHaveLength(1);
	});
});
