import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import ListCustomerService from '@modules/customers/services/ListCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;
let customerService: ListCustomerService;

describe('List customer', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		customerService = new ListCustomerService(fakeCustomerRepository);
	});

	it('should return a customer', async () => {
		await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});
		const customer = await customerService.execute();
		expect(customer).toHaveLength(1);
	});
});
