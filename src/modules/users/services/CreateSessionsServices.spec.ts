import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsServices from '@modules/users/services/CreateSessionsServices';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createToken: FakeTokenProvider;
let createSession: CreateSessionsServices;

describe('Create Session', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		createToken = new FakeTokenProvider();
		createSession = new CreateSessionsServices(
			fakeUserRepository,
			fakeHashProvider,
			createToken,
		);

		const user = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: '',
		});
	});

	it('should  be able to authenticate', async () => {
		const email = 'ernestomaria93@gmail.com';
		const password = '123456';
		const user = await createSession.execute({ email, password });

		expect(user).toHaveProperty('token');
	});
	it('should not be able to signIn whith no exist email', async () => {
		await expect(
			createSession.execute({
				email: 'ernestomaria@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should not be able to signIn whith no exist email', async () => {
		await expect(
			createSession.execute({
				email: 'ernestomaria93@gmail.com',
				password: '1234',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
