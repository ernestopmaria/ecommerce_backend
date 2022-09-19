import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
	token: string;
	password: string;
}

class ResetPasswordService {
	public async execute({ token, password }: IRequest): Promise<void> {
		const userTokensRepository = getCustomRepository(UserTokensRepository);
		const userRepository = getCustomRepository(UserRepository);
		const userToken = await userTokensRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('Token não existe!');
		}

		const user = await userRepository.findById(userToken.user_id);


		if (!user) {
			throw new AppError('Usuário não existe!');
		}
		const tokenCreatedAt = userToken.created_at;

		const compareDate = addHours(tokenCreatedAt, 2);
		if (isAfter(Date.now(), compareDate)) {
			throw new AppError('Token expirado!');
		}
		user.password = await hash(password, 10);

		await userRepository.save(user)
		
	}
}
export default ResetPasswordService;
