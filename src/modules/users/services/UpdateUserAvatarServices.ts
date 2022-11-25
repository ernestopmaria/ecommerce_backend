import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import uploadConfig from '@config/upload';

interface IRequest {
	user_id: string;
	avatarFilename: string;
}

class UpdateUserAvatarServices {
	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UserRepository);

		const user = await userRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}
		user.avatar = avatarFilename;

		await userRepository.save(user);

		return user;
	}
}
export default UpdateUserAvatarServices;
