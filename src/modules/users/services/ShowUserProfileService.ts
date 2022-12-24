import { IShowUser } from './../domain/models/IShowUser';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../domain/repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class ShowUserProfileService {
	constructor(
		@inject('UsersRepository')
		private userRepository: IUsersRepository,
	) {}
	public async execute({ id }: IShowUser): Promise<User> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new AppError('User not found');
		}
		return user;
	}
}

export default ShowUserProfileService;
