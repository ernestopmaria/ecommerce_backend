import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let userService: UpdateProfileService;

describe('Update User Profile', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		userService = new UpdateProfileService(fakeUserRepository);
	});

	it('should update a user profile', async () => {
		const createUser = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: 'user',
		});

		const createUserUpdated = {
			user_id: createUser.id,
			name: 'Ernesto',
			email: 'ernestomaria@gmail.com',
			old_password: createUser.password,
			password: '1234569',
			role: 'user',
		};

		const user = await userService.execute(createUserUpdated);
		expect(user.email).toEqual('ernestomaria@gmail.com');
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
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
		};

		expect(userService.execute(user2)).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when the email to update already in use', async () => {
		const user = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria@gmail.com',
			password: '123456',
			role: 'user',
		});

		await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: 'user',
		});

		const updatedUser = {
			user_id: user.id,
			name: 'Maria',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: 'user',
		};
		expect(userService.execute(updatedUser)).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when the oldpassword is not correct', async () => {
		const user = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria@gmail.com',
			password: '123456',
			role: 'user',
		});

		const updatedUser = {
			user_id: user.id,
			name: 'Maria',
			email: 'ernestomaria93@gmail.com',
			password: '12345670',

			role: 'user',
		};
		expect(userService.execute(updatedUser)).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when the oldpassword ', async () => {
		const user = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria@gmail.com',
			password: '123456',
			role: 'user',
		});

		const updatedUser = {
			user_id: user.id,
			name: 'Maria',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			old_password: '1234567',
			role: 'user',
		};
		expect(userService.execute(updatedUser)).rejects.toBeInstanceOf(AppError);
	});
});
