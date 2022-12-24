import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface IRequest {
	id: string;
	name: string;
	email: string;
}

@injectable()
class UpdateCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: ICustomersRepository,
	) {}
	public async execute({ id, name, email }: IRequest): Promise<ICustomer> {
		const customer = await this.customerRepository.findById(id);

		if (!customer) {
			throw new AppError('Cliente não encontrado');
		}

		const customerUpdateEmail = await this.customerRepository.findByEmail(
			email,
		);

		if (customerUpdateEmail && customerUpdateEmail.id !== id) {
			throw new AppError('Este email já está em uso');
		}

		customer.name = name;
		customer.email = email;

		await this.customerRepository.save(customer);

		return customer;
	}
}
export default UpdateCustomerService;
