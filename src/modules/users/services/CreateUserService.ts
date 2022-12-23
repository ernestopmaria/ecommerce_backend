import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
	name: string;
	email: string;
	password: string;
	role: string;
}

class CreateUSerService {
	public async execute({
		name,
		email,
		password,
		role,
	}: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UserRepository);
		const emailExists = await userRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Este email já está em uso');
		}
		const roleDefault = 'user';
		const passwordHashed = await hash(password, 10);
		if (!role) {
			role = roleDefault;
		}

		const user = userRepository.create({
			name,
			email,
			password: passwordHashed,
			role,
		});
		await userRepository.save(user);
		return user;
	}
}
export default CreateUSerService;
