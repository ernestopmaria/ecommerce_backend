import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import ListUserService from './ListUserService';

let fakeUserRepository: FakeUsersRepository;
let listUser: ListUserService;
let fakeRediscache: FakeRedisCache;

describe('Create User', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		fakeRediscache = new FakeRedisCache();
		listUser = new ListUserService(fakeUserRepository, fakeRediscache);

		await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
			password: '123456',
			role: '',
		});
	});

	it('should contain 1 user to list', async () => {
		const user = await listUser.execute();
		expect(user).toHaveLength(1);
	});
});
