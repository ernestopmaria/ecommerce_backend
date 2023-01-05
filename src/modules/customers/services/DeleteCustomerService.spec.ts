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
		const page = 1;
		const skip = 1;
		const take = 15;
		await deleteService.execute({ id });

		expect(
			(await fakeCustomerRepository.findAll({ page, skip, take })).data,
		).toHaveLength(0);
	});

	it('should throw when not exist customer to delete', async () => {
		await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});
		const id = '54ab7597-95d7-4dec-948d-teste7dce37399d72';

		expect(deleteService.execute({ id })).rejects.toBeInstanceOf(AppError);
	});
});
