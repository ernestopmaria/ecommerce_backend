import { getCustomRepository } from 'typeorm';

import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class ListCustomerService {
	public async execute(): Promise<Customer[]> {
		const customerRepository = getCustomRepository(CustomerRepository);
		const customer = await customerRepository.find();
		return customer;
	}
}

export default ListCustomerService;
