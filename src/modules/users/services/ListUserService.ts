import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUserRepository';

@injectable()
class ListUserService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,
	) {}
	public async execute(): Promise<IUser[]> {
		const user = await this.userRepository.findAll();
		return user;
	}
}

export default ListUserService;
