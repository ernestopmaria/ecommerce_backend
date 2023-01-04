import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';
import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';

let fakeCustomerRepository: FakeCustomerRepository;
let customerService: CreateCustomerService;
let fakeRediscache: FakeRedisCache;

describe('Create customer', () => {
	beforeEach(() => {
		fakeCustomerRepository = new FakeCustomerRepository();
		fakeRediscache = new FakeRedisCache();

		customerService = new CreateCustomerService(
			fakeCustomerRepository,
			fakeRediscache,
		);
	});
	it('should  be able to create a new customer', async () => {
		const customer = await customerService.execute({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		expect(customer).toHaveProperty('id');
	});

	it('should not be able to create a customer with exist email', async () => {
		await customerService.execute({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		}),
			expect(
				customerService.execute({
					name: 'Ernesto',
					email: 'ernestomaria93@gmail.com',
				}),
			).rejects.toBeInstanceOf(AppError);
	});
});
