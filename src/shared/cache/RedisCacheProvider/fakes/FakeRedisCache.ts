import FakeCustomerRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import { IRedisProvider } from '../models/IRedisCache';

export default class FakeRedisCache implements IRedisProvider {
	public customers: any;
	constructor(customer = new FakeCustomerRepository()) {
		this.customers = customer.customers;
	}

	public async save(key: string, value: any): Promise<void> {
		await this.customers.push(key, JSON.stringify(value));
	}

	public async recover<T>(key: string): Promise<T | null> {
		const data = await this.customers[key];
		if (!data) {
			return null;
		}
		const parseData = JSON.parse(data) as T;
		return parseData;
	}

	public async invalidate(key: string): Promise<void> {
		delete this.customers;
	}
}
