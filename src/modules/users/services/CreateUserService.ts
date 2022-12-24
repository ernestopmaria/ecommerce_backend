import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { IUser } from '../domain/models/IUser';
import { ICreateUser } from '../domain/models/ICreateUser';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUserRepository';

@injectable()
class CreateUSerService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,
	) /* 	@inject('HashProvider')
		private hashProvider: IHashProvider, */
	{}

	public async execute({
		name,
		email,
		password,
		role,
	}: ICreateUser): Promise<IUser> {
		const emailExists = await this.userRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Este email já está em uso');
		}
		const roleDefault = 'user';
		const passwordHashed = await hash(password, 10);
		if (!role) {
			role = roleDefault;
		}

		const user = this.userRepository.create({
			name,
			email,
			password: passwordHashed,
			role,
		});

		return user;
	}
}
export default CreateUSerService;
