import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import {
	ICustomersRepository,
	SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import { randomUUID } from 'node:crypto';
import { ICustomer } from '../../models/ICustomer';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';

class FakeCustomerRepository implements ICustomersRepository {
	public customers: ICustomer[] = [];

	public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
		const customer: ICustomer = {
			id: randomUUID(),
			name,
			email,
			created_at: new Date(),
			updated_at: new Date(),
		};

		this.customers.push(customer);

		return customer;
	}

	public async save(customer: ICustomer): Promise<ICustomer> {
		const customerIndex = this.customers.findIndex(e => e.id === customer.id);

		this.customers[customerIndex] = customer;
		return customer;
	}

	public async findByName(name: string): Promise<ICustomer | null> {
		return this.customers.find(c => c.name === name) as unknown as null;
	}

	public async findById(id: string): Promise<ICustomer | null> {
		return this.customers.find(c => c.id === id) as unknown as null;
	}

	public async findByEmail(email: string): Promise<ICustomer | null> {
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

	public async remove(customer: ICustomer): Promise<void> {
		const customerIndex = this.customers.findIndex(e => e.id === customer.id);
		this.customers.splice(customerIndex, 1);
	}
}

export default FakeCustomerRepository;
