import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionsServices from '@modules/users/services/CreateSessionsServices';
import { container } from 'tsyringe';

class SessionsController {
	public async sessions(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		const createSessionsService = container.resolve(CreateSessionsServices);
		const user = await createSessionsService.execute({
			email,
			password,
		});
		return res.json(instanceToInstance(user));
	}
}

export default SessionsController;
