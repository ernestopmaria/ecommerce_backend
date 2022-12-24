import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface IRequest {
	id: string;
}

@injectable()
class ShowCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: ICustomersRepository,
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
