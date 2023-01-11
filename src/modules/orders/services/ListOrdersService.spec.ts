import FakeCustomerRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';
import FakeOrdersRepository from '../domain/repositories/fakes/FakeOrdersRepository';
import ListOrdersService from './ListOrdersService';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeCustomerRepository: FakeCustomerRepository;
let ordersService: ListOrdersService;
let fakeRediscache: FakeRedisCache;

describe('List orders', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		fakeProductsRepository = new FakeProductsRepository();
		fakeOrdersRepository = new FakeOrdersRepository();
		fakeRediscache = new FakeRedisCache();
		ordersService = new ListOrdersService(fakeOrdersRepository, fakeRediscache);
	});

	it('should return a orders', async () => {
		const page = 1;
		const limit = 15;

		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});
		const orderReturned = await fakeOrdersRepository.createOrder({
			customer: {
				id: customer.id,
				name: customer.name,
				email: customer.email,
				created_at: new Date(),
				updated_at: new Date(),
			},
			products: [
				{
					product_id: product.id,
					quantity: 2,
					price: 2500,
				},
			],
		});

		const orders = (await ordersService.execute({ page, limit })).data;

		expect(orders).toHaveLength(1);
	});
});
