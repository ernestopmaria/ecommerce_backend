import AppError from '@shared/errors/AppError';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { injectable, inject } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: ICustomersRepository,
	) {}

	public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
		const emailExists = await this.customerRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Este email já está em uso');
		}

		const customer = await this.customerRepository.create({
			name,
			email,
		});
		return customer;
	}
}
export default CreateCustomerService;
