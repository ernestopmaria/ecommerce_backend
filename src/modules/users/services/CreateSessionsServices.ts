import 'dotenv/config';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUserRepository';
import { ICreateSession } from '../domain/models/ICreateSession';
//import sign from 'jsonwebtoken';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';

@injectable()
class CreateSessionsServices {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository /* @inject('HashProvider')
		private hashProvider: IHashProvider, */,
	) {}
	public async execute({
		email,
		password,
	}: ICreateSession): Promise<IUserAuthenticated> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Verifique as credenciais');
		}
		const passwordConfirmed = await compare(password, user.password);

		if (!passwordConfirmed) {
			throw new AppError('Verifique as suas credenciais');
		}

		const response = {
			subject: user.id,
			role: user.role,
			name: user.name,
			email: user.email,
		};

		const token = jwt.sign(response, authConfig.jwt.secret, {
			expiresIn: authConfig.jwt.expiresIn,
		});

		return {
			user,
			token,
		};
	}
}

export default CreateSessionsServices;
