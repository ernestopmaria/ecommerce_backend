import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
	user_id: string;
}

class ShowUserProfileService {
	public async execute({ user_id }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UserRepository);
		const user = await userRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}
		return user;
	}
}

export default ShowUserProfileService;
