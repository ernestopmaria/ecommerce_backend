import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../domain/repositories/fakes/FakeUserTokenRepository';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let userService: ResetPasswordService;

describe('Reset password', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokenRepository();
		userService = new ResetPasswordService(
			fakeUserRepository,
			fakeUserTokensRepository,
		);
	});
	it('Should be able to reset password', async () => {
		const user = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria4@gmail.com',
			password: '123456',
			role: 'user',
		});
		const userToken = await fakeUserTokensRepository.generate(user.id);

		const token = userToken.token;
		const password = user.password;
		const resetedPassword = await userService.execute({ token, password });

		expect(resetedPassword).toHaveProperty('id');
	});
	it('should throw when token does not exist', async () => {
		const token = 'fake_token';
		const password = '123456';

		expect(async () => {
			await userService.execute({ token, password });
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when user does not exist', async () => {
		const id = '1d5a0558-aa40-4f12-babe-teste-ea95850e7e8f';

		const userToken = await fakeUserTokensRepository.generate(id);

		const token = userToken.token;
		const password = 'user_password';

		expect(async () => {
			await userService.execute({ token, password });
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when token is expired', async () => {
		const user = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria4@gmail.com',
			password: '123456',
			role: 'user',
		});
		const userToken = await fakeUserTokensRepository.generate(user.id);

		userToken.created_at = new Date('December 17, 2022 03:24:00');

		const token = userToken.token;
		const password = 'user_password';

		expect(async () => {
			await userService.execute({ token, password });
		}).rejects.toBeInstanceOf(AppError);
	});
});
