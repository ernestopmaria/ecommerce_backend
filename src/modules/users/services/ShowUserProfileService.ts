import { IShowUser } from './../domain/models/IShowUser';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
class ShowUserProfileService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,
	) {}
	public async execute({ id }: IShowUser): Promise<IUser> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new AppError('User not found');
		}
		return user;
	}
}

export default ShowUserProfileService;
