import { Repository, getRepository } from 'typeorm';
import User from '../entities/User';
import { IUsersRepository } from '../../../domain/repositories/IUserRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { dataSource } from '../../../../../shared/infra/typeorm/index';

class UserRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = dataSource.getRepository(User);
	}

	public async create({
		name,
		email,
		password,
		role,
	}: ICreateUser): Promise<User> {
		const user = this.ormRepository.create({ name, email, password, role });

		await this.ormRepository.save(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		await this.ormRepository.save(user);

		return user;
	}

	public async findAll(): Promise<User[]> {
		const result = await this.ormRepository.find();

		return result;
	}

	public async findByName(name: string): Promise<User | null> {
		const user = await this.ormRepository.findOne({
			where: { name },
		});
		return user;
	}

	public async findById(id: string): Promise<User | null> {
		const user = await this.ormRepository.findOne({
			where: { id },
		});
		return user;
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user = await this.ormRepository.findOne({
			where: { email },
		});
		return user;
	}
}

export default UserRepository;
