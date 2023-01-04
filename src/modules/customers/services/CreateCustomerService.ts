import AppError from '@shared/errors/AppError';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { injectable, inject } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { IRedisProvider } from '@shared/cache/RedisCacheProvider/models/IRedisCache';

@injectable()
class CreateCustomerService {
	constructor(
		@inject('CustomerRepository')
		private customerRepository: ICustomersRepository,

		@inject('RedisCache')
		private redisCache: IRedisProvider,
	) {}

	public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
		const emailExists = await this.customerRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Este email já está em uso');
		}
		await this.redisCache.invalidate('api-vendas-CUSTOMER_LIST');
		const customer = await this.customerRepository.create({
			name,
			email,
		});

		return customer;
	}
}
export default CreateCustomerService;
