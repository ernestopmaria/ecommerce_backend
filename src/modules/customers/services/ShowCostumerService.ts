import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';

interface IRequest {
	id: string;
}

@injectable()
class ShowCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: CustomerRepository,
	) {}
	public async execute({ id }: IRequest): Promise<ICustomer> {
		const customer = await this.customerRepository.findById(id);

		if (!customer) {
			throw new AppError('Cliente não encontrado');
		}
		return customer;
	}
}

export default ShowCustomerService;
