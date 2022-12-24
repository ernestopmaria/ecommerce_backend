import { injectable, inject } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import redisCache from '@shared/cache/RedisCache';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
@injectable()
class ListCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: ICustomersRepository,
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
