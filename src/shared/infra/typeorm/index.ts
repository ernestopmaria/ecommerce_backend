import { DataSource } from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Products';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { CreateProducts1662228018905 } from './migrations/1662228018905-CreateProducts';
import { CreateUsers1662495827925 } from './migrations/1662495827925-CreateUsers';
import { CreateCustomers1668086630525 } from './migrations/1668086630525-CreateCustomers';
import { CreateUserTokens1663392680083 } from './migrations/1663392680083-CreateUserTokens';
import { CreateOrders1668120587957 } from './migrations/1668120587957-CreateOrders';
import { AddCustomerIdOrders1668120916446 } from './migrations/1668120916446-AddCustomerIdOrders';
import { CreateOrdersProducts1668122107075 } from './migrations/1668122107075-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1668122329007 } from './migrations/1668122329007-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1668122574099 } from './migrations/1668122574099-AddProductIdToOrdersProducts';
import { AddOrderFieldToOrders1671891299918 } from './migrations/1671891299918-AddOrderFieldToOrders';
import { AddRoleToUsers1669366626802 } from './migrations/1669366626802-AddRoleToUsers';
import { CreateCategoryTable1672825517020 } from './migrations/1672825517020-CreateCategoryTable';
import { Category } from '@modules/products/infra/typeorm/entities/Category';

export const dataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'docker123',
	database: 'apivendas',
	entities: [
		User,
		UserToken,
		Customer,
		Order,
		OrdersProducts,
		Product,
		Category,
	],
	migrations: [
		CreateProducts1662228018905,
		CreateUsers1662495827925,
		CreateUserTokens1663392680083,
		CreateCustomers1668086630525,
		CreateOrders1668120587957,
		AddCustomerIdOrders1668120916446,
		CreateOrdersProducts1668122107075,
		AddOrderIdToOrdersProducts1668122329007,
		AddProductIdToOrdersProducts1668122574099,
		AddRoleToUsers1669366626802,
		AddOrderFieldToOrders1671891299918,
		CreateCategoryTable1672825517020,
	],
});
