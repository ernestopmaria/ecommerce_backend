import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../domain/repositories/fakes/FakeUserTokenRepository';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let userService: SendForgotPasswordEmailService;

describe('Send Forgot password', () => {
	beforeEach(async () => {
		fakeUserRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokenRepository();
		userService = new SendForgotPasswordEmailService(
			fakeUserRepository,
			fakeUserTokensRepository,
		);
	});
	it('Should be able to send  recover password', async () => {
		const user = await fakeUserRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria4@gmail.com',
			password: '123456',
			role: 'user',
		});
		const email = user.email;
		const resetedPassword = await userService.execute({ email });

		expect(resetedPassword).toHaveProperty('email');
	});

	it('should throw when user does not exist', async () => {
		const email = 'fake_email';

		expect(userService.execute({ email })).rejects.toBeInstanceOf(AppError);
	});
});
