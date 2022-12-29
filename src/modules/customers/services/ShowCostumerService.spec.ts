import AppError from '@shared/errors/AppError';
import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from './ShowCostumerService';

let fakeCustomerRepository: FakeCustomerRepository;
let customerService: ShowCustomerService;

describe('Show customer', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		customerService = new ShowCustomerService(fakeCustomerRepository);
	});

	it('should return one customer', async () => {
		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const customerReturned = await customerService.execute(customer);
		expect(customerReturned.email).toEqual('ernestomaria93@gmail.com');
	});

	it('should throw when not exist customer to show', async () => {
		await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});
		const id = 'fake_id';

		expect(customerService.execute({ id })).rejects.toBeInstanceOf(AppError);
	});
});
