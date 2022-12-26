import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { randomUUID } from 'node:crypto';

class FakeCustomerRepository implements ICustomersRepository {
	private customers: Customer[] = [];

	public async create({ name, email }: ICreateCustomer): Promise<Customer> {
		const customer = new Customer();
		customer.id = randomUUID();
		customer.name = name;
		customer.email = email;
		this.customers.push(customer);

		return customer;
	}

	public async save(customer: Customer): Promise<Customer> {
		Object.assign(this.customers, customer);
		return customer;
	}

	public async findByName(name: string): Promise<Customer | undefined> {
		return this.customers.find(c => c.name === name);
	}

	public async findById(id: string): Promise<Customer | undefined> {
		return this.customers.find(c => c.id === id);
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		return this.customers.find(c => c.email === email);
	}

	public async find(): Promise<Customer[]> {
		return this.customers;
	}

	public async remove(customer: Customer): Promise<void> {
		const customerIndex = this.customers.findIndex(e => e.id === customer.id);
		this.customers.splice(customerIndex, 1);
	}
}

export default FakeCustomerRepository;
