import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { hash } from 'bcryptjs';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

class CreateUSerService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UserRepository);
		const emailExists = await userRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Este email já está em uso');
		}
		const passwordHashed = await hash(password, 10);

		const user = userRepository.create({
			name,
			email,
			password: passwordHashed,
		});
		await userRepository.save(user);
		return user;
	}
}
export default CreateUSerService;
