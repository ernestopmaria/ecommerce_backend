import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import ShowProductService from './ShowProductService';
import AppError from '@shared/errors/AppError';

let fakeProductRepository: FakeProductsRepository;
let productService: ShowProductService;

describe('Show product', () => {
	beforeEach(() => {
		fakeProductRepository = new FakeProductsRepository();
		productService = new ShowProductService(fakeProductRepository);
	});
	it('should be able to return a product', async () => {
		const product = await fakeProductRepository.create({
			name: 'Sabonete',
			price: 2000,
			quantity: 50,
		});
		const productReturned = await productService.execute(product);
		expect(productReturned.name).toEqual('Sabonete');
	});

	it('should throw when not exists product', async () => {
		await fakeProductRepository.create({
			name: 'Sabonete',
			price: 2000,
			quantity: 50,
		});
		const id = 'fake_id';

		expect(productService.execute({ id })).rejects.toBeInstanceOf(AppError);
	});
});
