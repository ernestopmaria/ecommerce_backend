import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

class ForgotPasswordController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { email } = req.body;
		const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();
		await sendForgotPasswordEmailService.execute({
			email,
		});

		return res.status(204).json();
	}
}

export default ForgotPasswordController;
