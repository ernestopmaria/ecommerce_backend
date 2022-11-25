import Customer from '../../../customers/typeorm/entities/Customer';
import OrdersProducts from './OrdersProducts';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
class Order {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Customer, customer => customer.orders)
	@JoinColumn({ name: 'customer_id' })
	customer: Customer;

	@OneToMany(() => OrdersProducts, order_products => order_products.order, {
		cascade: true,
	})
	order_products: OrdersProducts[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Order;
