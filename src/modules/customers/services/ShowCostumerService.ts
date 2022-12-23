import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

interface IRequest {
	id: string;
}

class ShowCustomerService {
	public async execute({ id }: IRequest): Promise<Customer> {
		const customerRepository = getCustomRepository(CustomerRepository);
		const customer = await customerRepository.findById(id);

		if (!customer) {
			throw new AppError('Cliente não encontrado');
		}
		return customer;
	}
}

export default ShowCustomerService;
