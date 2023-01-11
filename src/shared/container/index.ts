import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import '@modules/users/providers';
import RedisCache from '../cache/RedisCacheProvider/implementations/RedisCache';
import { IRedisProvider } from '@shared/cache/RedisCacheProvider/models/IRedisCache';
import { ICategoriesRepository } from '../../modules/products/domain/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/products/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<ICustomersRepository>(
	'CustomerRepository',
	CustomerRepository,
);

container.registerSingleton<IOrdersRepository>(
	'OrdersRepository',
	OrdersRepository,
);

container.registerSingleton<IProductsRepository>(
	'ProductRepository',
	ProductRepository,
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokensRepository,
);

container.registerSingleton<IRedisProvider>('RedisCache', RedisCache);

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository,
);
