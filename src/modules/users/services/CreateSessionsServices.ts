import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import sign from 'jsonwebtoken';

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
			throw new AppError('Verifique as suas credenciais');
		}
		const role = user.role;

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
