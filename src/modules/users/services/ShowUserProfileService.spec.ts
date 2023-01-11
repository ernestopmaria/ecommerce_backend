import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let userService: ShowUserProfileService;

describe('Show User profile', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		userService = new ShowUserProfileService(fakeUserRepository);
	});

	it('should show  1 user ', async () => {
		const createUser = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: '',
		});
		const id = createUser.id;
		const user = await userService.execute({ id });
		expect(user.email).toEqual('ernestomaria93@gmail.com');
	});

	it('should throw when not exist user to show', async () => {
		await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: '',
		});
		const id = 'fake_id';

		await expect(userService.execute({ id })).rejects.toBeInstanceOf(AppError);
	});
});
