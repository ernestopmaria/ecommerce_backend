import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUserRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { IResetPassword } from '../domain/models/IResetPassword';

@injectable()
class ResetPasswordService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,

		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository,
	) {}
	public async execute({ token, password }: IResetPassword): Promise<void> {
		const userToken = await this.userTokensRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('Token não existe!');
		}

		const user = await this.userRepository.findById(userToken.user_id);

		if (!user) {
			throw new AppError('Usuário não existe!');
		}
		const tokenCreatedAt = userToken.created_at;

		const compareDate = addHours(tokenCreatedAt, 2);
		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('Token expirado!');
		}
		user.password = await hash(password, 10);

		await this.userRepository.save(user);
	}
}
export default ResetPasswordService;
