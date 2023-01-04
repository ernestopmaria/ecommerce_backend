import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';

let fakeCustomerRepository: FakeCustomerRepository;
let customerService: ListCustomerService;
let fakeRediscache: FakeRedisCache;

describe('List customer', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		fakeRediscache = new FakeRedisCache();
		customerService = new ListCustomerService(
			fakeCustomerRepository,
			fakeRediscache,
		);
	});

	it('should return a customer', async () => {
		const page = 1;
		const limit = 15;
		await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});
		const customer = await customerService.execute({ page, limit });
		expect(customer).toHaveProperty('data');
	});
});
