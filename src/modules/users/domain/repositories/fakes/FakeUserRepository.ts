import { randomUUID } from 'node:crypto';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';

import User from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUserRepository';
import { IUser } from '../../models/IUser';
//import { IPaginateUser } from '../../models/IPaginateUser';

class FakeUsersRepository implements IUsersRepository {
	private users: User[] = [];

	public async create({ name, email, password }: ICreateUser): Promise<User> {
		const user = new User();
		user.id = randomUUID();
		user.name = name;
		user.email = email;
		user.password = password;

		this.users.push(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

		this.users[findIndex] = user;

		return user;
	}

	public async remove(user: User): Promise<void> {}

	public async findAll(): Promise<User[]> {
		return this.users;
	}

	/* 	public async findAllPaginate(): Promise<IPaginateUser> {
		const usersPaginate = {
			from: 1,
			to: 1,
			per_page: 1,
			total: 1,
			current_page: 1,
			prev_page: null,
			next_page: null,
			data: this.users,
		};

		return usersPaginate;
	} */

	public async findByName(name: string): Promise<IUser | null> {
		const user = this.users.filter(user => user.name === name)[0];
		return user;
	}

	public async findById(id: string): Promise<IUser | null> {
		const user = this.users.filter(user => user.id === id)[0];
		return user;
	}

	public async findByEmail(email: string): Promise<IUser | null> {
		const user = this.users.filter(user => user.email === email)[0];
		return user;
	}
}

export default FakeUsersRepository;
