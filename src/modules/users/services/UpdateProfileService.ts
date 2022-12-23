import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
	user_id: string;
	name: string;
	email: string;
	password?: string;
	old_password?: string;
}

class UpdateProfileService {
	public async execute({
		user_id,
		name,
		email,
		password,
		old_password,
	}: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UserRepository);
		const user = await userRepository.findById(user_id);

		if (!user) {
			throw new AppError('Usuario não encontrado');
		}

		const userUpdateEmail = await userRepository.findByEmail(email);

		if (userUpdateEmail && userUpdateEmail.id !== user_id) {
			throw new AppError('Este email já está em uso');
		}

		if (password && !old_password) {
			throw new AppError('A senha antiga é obrigatória');
		}

		if (password && old_password) {
			const checkOldPassword = await compare(old_password, user.password);
			if (!checkOldPassword) {
				throw new AppError('Senha antiga não está correcta');
			}
			user.password = await hash(password, 10);
		}

		user.name = name;
		user.email = email;

		await userRepository.save(user);

		return user;
	}
}
export default UpdateProfileService;
