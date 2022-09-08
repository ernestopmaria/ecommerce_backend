import { Request, Response } from 'express';
import CreateSessionsServices from '../services/CreateSessionsServices';

class SessionsController {
	public async sessions(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		const createSessionsService = new CreateSessionsServices();
		const user = await createSessionsService.execute({
			email,
			password,
		});
		return res.json(user);
	}
}

export default SessionsController;
