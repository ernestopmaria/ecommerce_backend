import { injectable, inject } from 'tsyringe';
import redisCache from '@shared/cache/RedisCacheProvider/implementations/RedisCache';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { IRedisProvider } from '../../../shared/cache/RedisCacheProvider/models/IRedisCache';
import { ICustomer } from '../domain/models/ICustomer';

interface SearchParams {
	page: number;
	limit: number;
}
@injectable()
class ListCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: ICustomersRepository,
		@inject('RedisCache')
		private redisCache: IRedisProvider,
	) {}
	public async execute({
		page,
		limit,
	}: SearchParams): Promise<ICustomerPaginate> {
		const take = limit;
		const skip = (Number(page) - 1) * take;
		let customers = await this.redisCache.recover<ICustomerPaginate>(
			'api-vendas-CUSTOMER_LIST',
		);
		if (!customers) {
			customers = await this.customerRepository.findAll({ page, skip, take });
			await this.redisCache.save('pi-vendas-CUSTOMER_LIST', customers);
		}

		return customers;
	}
}

export default ListCustomerService;
