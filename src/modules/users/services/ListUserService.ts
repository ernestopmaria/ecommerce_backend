import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

class ListUserService {
	public async execute(): Promise<User[]> {
		const userRepository = getCustomRepository(UserRepository);
		const user = await userRepository.find();
		return user;
	}
}

export default ListUserService;
