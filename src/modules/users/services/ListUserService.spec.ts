import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ListUserService from './ListUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let listUser: ListUserService;

describe('Create User', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		listUser = new ListUserService(fakeUserRepository);
		fakeHashProvider = new FakeHashProvider();

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
