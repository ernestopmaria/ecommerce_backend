import 'dotenv/config';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUserRepository';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../providers/TokenProvider/models/ITokenProvider';

@injectable()
class CreateSessionsServices {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
		@inject('TokenProvider')
		private tokenProvider: ITokenProvider,
	) {}
	public async execute({
		email,
		password,
	}: ICreateSession): Promise<IUserAuthenticated> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Verifique as credenciais');
		}
		const passwordConfirmed = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordConfirmed) {
			throw new AppError('Verifique as suas credenciais');
		}

		const response = {
			subject: user.id,
			role: user.role,
			name: user.name,
			email: user.email,
		};

		const token = await this.tokenProvider.sign(response);

		return {
			user,
			token,
		};
	}
}

export default CreateSessionsServices;
