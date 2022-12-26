import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

describe('Create customer', () => {
	it('should  be able to create a new customer', async () => {
		const fakeCustomerRepository = new FakeCustomerRepository();
		const customerRepositoryService = new CreateCustomerService(
			fakeCustomerRepository,
		);
		const customer = await customerRepositoryService.execute({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		expect(customer).toHaveProperty('id');
	});

	it('should not be able to create a customer with exist email', async () => {
		const fakeCustomerRepository = new FakeCustomerRepository();
		const customerRepositoryService = new CreateCustomerService(
			fakeCustomerRepository,
		);
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
