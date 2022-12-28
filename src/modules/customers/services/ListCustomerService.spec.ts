import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import ListCustomerService from '@modules/customers/services/ListCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;
let customerService: ListCustomerService;

describe('Create customer', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		customerService = new ListCustomerService(fakeCustomerRepository);

		await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});
	});

	it('should not be able to create a customer with exist email', async () => {
		const customer = await customerService.execute();
		expect(customer).toHaveLength(1);
	});
});
