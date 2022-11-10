import { getCustomRepository } from 'typeorm';
import Curstomer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';


class ListCustomerService {
	public async execute(): Promise<Curstomer[]> {
		const customerRepository = getCustomRepository(CustomerRepository);
		const customer = await customerRepository.find();
		return customer;
	}
}

export default ListCustomerService;
