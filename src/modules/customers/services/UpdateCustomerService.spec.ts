import AppError from '@shared/errors/AppError';
import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import UpdateCustomerService from './UpdateCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;
let customerService: UpdateCustomerService;

describe('Update customer', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		customerService = new UpdateCustomerService(fakeCustomerRepository);
	});

	it('should be able to update a customer', async () => {
		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const updatedCustomer = {
			id: customer.id,
			name: 'Ernesto',
			email: 'ernestomaria@gmail.com',
			orders: [],
			created_at: new Date(),
			updated_at: new Date(),
		};

		const customerReturned = await customerService.execute(updatedCustomer);
		expect(customerReturned.email).toEqual('ernestomaria@gmail.com');
	});

	it('should throw when not exist customer to update', async () => {
		const customer = {
			id: 'fake_id',
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		};

		expect(customerService.execute(customer)).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when the email to update alread in use', async () => {
		const costumer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const costumer2 = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria@gmail.com',
		});

		const updatedCustomer = {
			id: costumer.id,
			name: 'Ernesto',
			email: 'ernestomaria@gmail.com',
		};

		expect(customerService.execute(updatedCustomer)).rejects.toBeInstanceOf(
			AppError,
		);
	});
});
