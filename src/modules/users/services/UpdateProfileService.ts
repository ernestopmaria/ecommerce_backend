import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUsersRepository } from '../domain/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateProfileService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,
	) {}
	public async execute({
		user_id,
		name,
		email,
		password,
		old_password,
	}: IUpdateProfile): Promise<User> {
		const user = await this.userRepository.findById(user_id);

		if (!user) {
			throw new AppError('Usuario não encontrado');
		}

		const userUpdateEmail = await this.userRepository.findByEmail(email);

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

		await this.userRepository.save(user);

		return user;
	}
}
export default UpdateProfileService;
