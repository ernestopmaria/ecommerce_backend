import AppError from '@shared/errors/AppError';
import path from 'path';
import EtherealMail from '@config/mail/EtherealMail';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUserRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
class SendForgotPasswordEmailService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,

		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository,
	) {}
	public async execute({ email }: ISendForgotPasswordEmail): Promise<IUser> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new AppError('Usuário não existe!');
		}
		const token = await this.userTokensRepository.generate(user.id);

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs',
		);

		if (mailConfig.driver === 'ses') {
			await SESMail.sendMail({
				to: {
					name: user.name,
					email: user.email,
				},
				subject: '[KIBARATO] Recuperação de senha',

				templateData: {
					file: forgotPasswordTemplate,
					variables: {
						name: user.name,
						link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
					},
				},
			});
		}
		await EtherealMail.sendMail({
			to: {
				name: user.name,
				email: user.email,
			},
			subject: '[API Vendas] Recuperação de senha',

			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
				},
			},
		});
		return user;
	}
}
export default SendForgotPasswordEmailService;
