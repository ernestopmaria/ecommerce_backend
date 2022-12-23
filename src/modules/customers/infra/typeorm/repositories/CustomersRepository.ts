import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

class CustomerRepository implements ICustomersRepository {
	private ormRepository: Repository<Customer>;
	constructor() {
		this.ormRepository = getRepository(Customer);
	}

	public async create({ name, email }: ICreateCustomer): Promise<Customer> {
		const customer = this.ormRepository.create({ name, email });
		await this.ormRepository.save(customer);
		return customer;
	}

	public async save(customer: Customer): Promise<Customer> {
		return await this.ormRepository.save(customer);
	}
	public async findByName(name: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({
			where: { name },
		});
		return customer;
	}

	public async findById(id: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne(id);
		return customer;
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({
			where: { email },
		});
		return customer;
	}

	public async find(): Promise<Customer[]> {
		return await this.ormRepository.find();
	}

	public async remove(id: string): Promise<void> {
		await this.ormRepository.delete(id);
	}
}

export default CustomerRepository;
