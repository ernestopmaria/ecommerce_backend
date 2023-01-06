import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import UpdateProductService from './UpdateProductService';

let fakeProductRepository: FakeProductsRepository;
let fakeRediscache: FakeRedisCache;
let productService: UpdateProductService;

describe('Update product', () => {
	beforeEach(async () => {
		fakeProductRepository = new FakeProductsRepository();
		fakeRediscache = new FakeRedisCache();
		productService = new UpdateProductService(
			fakeProductRepository,
			fakeRediscache,
		);
	});
	it('should be able to update a product', async () => {
		const product = await fakeProductRepository.create({
			name: 'Sabonete',
			price: 12,
			quantity: 20,
		});
		const updatedProduct = {
			id: product.id,
			name: 'SaboneteActualizado',
			price: 12,
			quantity: 20,
		};
		const productReturned = await productService.execute(updatedProduct);
		expect(productReturned.name).toEqual('SaboneteActualizado');
	});
	it('should throw when not exist product to update', async () => {
		const product = {
			id: 'fake_id',
			name: 'Ernesto',
			price: 12,
			quantity: 20,
		};

		expect(productService.execute(product)).rejects.toBeInstanceOf(AppError);
	});
	it('should throw when the name of product to update already in use', async () => {
		const product = await fakeProductRepository.create({
			name: 'Sabonete',
			price: 12,
			quantity: 20,
		});

		const product2 = await fakeProductRepository.create({
			name: 'Sabonete2',
			price: 12,
			quantity: 20,
		});

		const updatedProduct = {
			id: product.id,
			name: 'Sabonete2',
			price: 12,
			quantity: 20,
		};

		expect(productService.execute(updatedProduct)).rejects.toBeInstanceOf(
			AppError,
		);
	});
});
