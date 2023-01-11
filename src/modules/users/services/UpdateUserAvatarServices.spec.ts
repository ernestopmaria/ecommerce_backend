import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarServices from './UpdateUserAvatarServices';

let fakeUserRepository: FakeUsersRepository;
let userService: UpdateUserAvatarServices;

describe('Update User Profile', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		userService = new UpdateUserAvatarServices(fakeUserRepository);
	});

	it('should throw when user was not found', async () => {
		await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: 'user',
		});
		const user2 = {
			user_id: 'fake_id',
			avatarFilename: 'user_update.jpg',
		};

		await expect(userService.execute(user2)).rejects.toBeInstanceOf(AppError);
	});
	it('should update a user avatar', async () => {
		const user = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: 'user',
		});
		const user2 = {
			user_id: user.id,
			avatarFilename: '2fe10c21c8f007dcfc83-vendacopy.jpg',
		};
		const userUpdated = await userService.execute(user2);

		expect(userUpdated).toHaveProperty('avatar');
	});
});
