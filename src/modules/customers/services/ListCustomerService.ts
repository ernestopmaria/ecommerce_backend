import { injectable, inject } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import redisCache from '@shared/cache/RedisCache';
@injectable()
class ListCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: CustomerRepository,
	) {}
	public async execute(): Promise<ICustomer[]> {
		let customers = await redisCache.recover<ICustomer[]>(
			'api-vendas-CUSTOMER_LIST',
		);
		if (!customers) {
			customers = await this.customerRepository.find();
			await redisCache.save('pi-vendas-CUSTOMER_LIST', customers);
		}

		return customers;
	}
}

export default ListCustomerService;
