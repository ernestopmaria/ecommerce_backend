import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import ShowUserService from './ShowUserService';

let fakeUserRepository: FakeUsersRepository;
let userService: ShowUserService;

describe('Show User', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		userService = new ShowUserService(fakeUserRepository);
	});

	it('should contain 1 user to list', async () => {
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

		expect(userService.execute({ id })).rejects.toBeInstanceOf(AppError);
	});
});
