import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

interface IRequest {
	id: string;
	name: string;
	email: string;
}

class UpdateCustomerService {
	public async execute({ id, name, email }: IRequest): Promise<Customer> {
		const customersRepository = getCustomRepository(CustomerRepository);
		const customer = await customersRepository.findById(id);

		if (!customer) {
			throw new AppError('Cliente não encontrado');
		}

		const customerUpdateEmail = await customersRepository.findByEmail(email);

		if (customerUpdateEmail && customerUpdateEmail.id !== id) {
			throw new AppError('Este email já está em uso');
		}

		customer.name = name;
		customer.email = email;

		await customersRepository.save(customer);

		return customer;
	}
}
export default UpdateCustomerService;
