import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UserRepository from '../typeorm/repositories/UserRepository';
import EtherealMail from '@config/mail/EtherealMail';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';

interface IRequest {
	email: string;
}

class SendForgotPasswordEmailService {
	public async execute({ email }: IRequest): Promise<void> {
		const userTokensRepository = getCustomRepository(UserTokensRepository);
		const userRepository = getCustomRepository(UserRepository);
		const user = await userRepository.findByEmail(email);
		if (!user) {
			throw new AppError('Usuário não existe!');
		}
		const token = await userTokensRepository.generate(user.id);

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
			return;
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
	}
}
export default SendForgotPasswordEmailService;
