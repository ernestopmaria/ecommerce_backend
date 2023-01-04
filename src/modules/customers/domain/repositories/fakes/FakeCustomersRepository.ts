import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import {
	ICustomersRepository,
	SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { randomUUID } from 'node:crypto';
import { ICustomer } from '../../models/ICustomer';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';

class FakeCustomerRepository implements ICustomersRepository {
	public customers: Customer[] = [];

	public async create({ name, email }: ICreateCustomer): Promise<Customer> {
		const customer = new Customer();
		customer.id = randomUUID();
		customer.name = name;
		customer.email = email;
		this.customers.push(customer);

		return customer;
	}

	public async save(customer: Customer): Promise<Customer> {
		const customerIndex = this.customers.findIndex(e => e.id === customer.id);

		this.customers[customerIndex] = customer;
		return customer;
	}

	public async findByName(name: string): Promise<Customer | null> {
		return this.customers.find(c => c.name === name) as unknown as null;
	}

	public async findById(id: string): Promise<ICustomer | null> {
		return this.customers.find(c => c.id === id) as unknown as null;
	}

	public async findByEmail(email: string): Promise<Customer | null> {
		let customer = this.customers.find(c => c.email === email);
		if (customer === undefined) {
			return customer as unknown as null;
		}
		return customer;
	}

	public async findAll({
		page,
		skip,
		take,
	}: SearchParams): Promise<ICustomerPaginate> {
		const result = {
			per_page: take,
			total: 1,
			current_page: page,
			data: this.customers,
		};
		return result;
	}

	public async remove(customer: Customer): Promise<void> {
		const customerIndex = this.customers.findIndex(e => e.id === customer.id);
		this.customers.splice(customerIndex, 1);
	}
}

export default FakeCustomerRepository;
