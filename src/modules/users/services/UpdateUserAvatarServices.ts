import AppError from '@shared/errors/AppError';

import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

interface IRequest {
	user_id: string;
	avatarFilename: string;
}

class UpdateUserAvatarServices {
	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UserRepository);
		const storageProvider = new DiskStorageProvider();

		const user = await userRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		if (user.avatar) {
			await storageProvider.deleteFile(user.avatar);
		}
		const filename = await storageProvider.saveFile(avatarFilename);

		user.avatar = filename;

		await userRepository.save(user);

		return user;
	}
}
export default UpdateUserAvatarServices;
