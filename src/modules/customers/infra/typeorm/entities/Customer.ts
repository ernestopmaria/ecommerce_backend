import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
class Customer implements ICustomer {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@OneToMany(() => Order, order => order.customer)
	orders: Order[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default Customer;
