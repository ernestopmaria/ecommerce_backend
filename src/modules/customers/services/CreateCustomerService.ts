import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
	name: string;
	email: string;
}

class CreateCustomerService {
	public async execute({ name, email }: IRequest): Promise<Customer> {
		const customerRepository = getCustomRepository(CustomerRepository);
		const emailExists = await customerRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Este email já está em uso');
		}

		const customer = customerRepository.create({
			name,
			email,
		});
		await customerRepository.save(customer);
		return customer;
	}
}
export default CreateCustomerService;
