import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
}

class CreateSessionsServices {
	public async execute({
		email,
		password,
	}: IRequest): Promise<IResponse | User> {
		const userRepository = getCustomRepository(UserRepository);
		const user = await userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Verifique as credenciais');
		}
		const passwordConfirmed = await compare(password, user.password);

		if (!passwordConfirmed) {
			throw new AppError('Verifique as credenciais');
		}

		return user;
	}
}

export default CreateSessionsServices;
