import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomerRepository: FakeCustomerRepository;
let customerRepositoryService: CreateCustomerService;

describe('Create customer', () => {
	beforeEach(() => {
		fakeCustomerRepository = new FakeCustomerRepository();
		customerRepositoryService = new CreateCustomerService(
			fakeCustomerRepository,
		);
	});
	it('should  be able to create a new customer', async () => {
		const customer = await customerRepositoryService.execute({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		expect(customer).toHaveProperty('id');
	});

	it('should not be able to create a customer with exist email', async () => {
		await customerRepositoryService.execute({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		}),
			expect(
				customerRepositoryService.execute({
					name: 'Ernesto',
					email: 'ernestomaria93@gmail.com',
				}),
			).rejects.toBeInstanceOf(AppError);
	});
});
