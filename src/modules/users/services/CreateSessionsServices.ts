import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

class CreateSessionsServices {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const userRepository = getCustomRepository(UserRepository);
		const user = await userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Verifique as credenciais');
		}
		const passwordConfirmed = await compare(password, user.password);

		if (!passwordConfirmed) {
			throw new AppError('Verifique as credenciais');
		}

		const token = sign({}, 'c16d669cfb1cf006c62d63d311a55276', {
			subject: user.id,
			expiresIn: '1d',
		});

		return {
			user,
			token,
		};
	}
}

export default CreateSessionsServices;
