import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeRediscache: FakeRedisCache;

describe('Create User', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		fakeRediscache = new FakeRedisCache();
		createUser = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider,
			fakeRediscache,
		);
	});
	it('should  be able to create a new User', async () => {
		const User = await createUser.execute({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: '',
		});

		expect(User).toHaveProperty('id');
	});

	it('should not be able to create a User with exist email', async () => {
		await createUser.execute({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: '',
		}),
			expect(
				createUser.execute({
					name: 'Ernesto',
					email: 'ernestomaria93@gmail.com',
					password: '123456',
					role: '',
				}),
			).rejects.toBeInstanceOf(AppError);
	});
});
