import FakeCustomerRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';

let fakeCustomerRepository: FakeCustomerRepository;
let deleteService: DeleteCustomerService;

describe('Create customer', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		deleteService = new DeleteCustomerService(fakeCustomerRepository);
	});

	it('should delete a exist customer', async () => {
		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});
		const id = customer.id;

		await deleteService.execute({ id });

		expect(() => {
			return fakeCustomerRepository.find();
		}).toHaveLength(0);
	});
});
