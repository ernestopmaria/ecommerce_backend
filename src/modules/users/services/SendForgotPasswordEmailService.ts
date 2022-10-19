import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UserRepository from '../typeorm/repositories/UserRepository';
import EtherealMail from '@config/mail/EtherealMail';


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

		await EtherealMail.sendMail({
			to: {
				name:user.name				,
				email:user.email},
				subject:'[API Vendas] Recuperação de senha',

				templateData:{
					template:`Olá {{name}} : {{token}}`,
				variables:{
					name:user.name,
					token:token.token,
				}
				}
		})
	}
}
export default SendForgotPasswordEmailService;
