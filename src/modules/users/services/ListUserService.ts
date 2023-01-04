import { IRedisProvider } from '@shared/cache/RedisCacheProvider/models/IRedisCache';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUserRepository';

@injectable()
class ListUserService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,
		@inject('RedisCache')
		private redisCache: IRedisProvider,
	) {}
	public async execute(): Promise<IUser[]> {
		const user = await this.userRepository.findAll();
		await this.redisCache.save('api-vendas-USER_LIST', user);

		return user;
	}
}

export default ListUserService;
