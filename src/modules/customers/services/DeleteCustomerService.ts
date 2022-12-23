import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
	id: string;
}

class DeleteCustomerService {
	public async execute({ id }: IRequest): Promise<void> {
		const customerRepository = getCustomRepository(CustomerRepository);
		const customer = await customerRepository.findById(id);

		if (!customer) {
			throw new AppError('Cliente não encontrado ');
		}
		await customerRepository.remove(customer);
	}
}

export default DeleteCustomerService;
