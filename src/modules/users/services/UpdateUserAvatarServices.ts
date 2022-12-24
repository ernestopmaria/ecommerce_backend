import { IUpdateUserAvatar } from './../domain/models/IUpdateUserAvatar';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUserRepository';

@injectable()
class UpdateUserAvatarServices {
	constructor(
		@inject('UsersRepository')
		private userRepository: IUsersRepository,
	) {}
	public async execute({
		user_id,
		avatarFilename,
	}: IUpdateUserAvatar): Promise<User> {
		const user = await this.userRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}
		if (uploadConfig.driver === 's3') {
			const s3Provider = new S3StorageProvider();
			if (user.avatar) {
				await s3Provider.deleteFile(user.avatar);
			}
			const filename = await s3Provider.saveFile(avatarFilename);
			user.avatar = filename;
		} else {
			const storageProvider = new DiskStorageProvider();
			if (user.avatar) {
				await storageProvider.deleteFile(user.avatar);
			}
			const filename = await storageProvider.saveFile(avatarFilename);
			user.avatar = filename;
		}

		await this.userRepository.save(user);

		return user;
	}
}
export default UpdateUserAvatarServices;
