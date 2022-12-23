import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
	id: string;
}
@injectable()
class DeleteCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: CustomerRepository,
	) {}
	public async execute({ id }: IRequest): Promise<void> {
		const customer = await this.customerRepository.findById(id);

		if (!customer) {
			throw new AppError('Cliente não encontrado ');
		}
		await this.customerRepository.remove(customer);
	}
}

export default DeleteCustomerService;
