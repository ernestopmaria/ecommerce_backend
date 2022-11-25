import { Request, Response } from 'express';
import CreateUSerService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import CreateSessionsServices from '../services/CreateSessionsServices';
import { instanceToInstance } from 'class-transformer';

class UserController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listUSerService = new ListUserService();
		const user = await listUSerService.execute();

		return res.json(instanceToInstance(user));
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;
		const createUserService = new CreateUSerService();
		const user = await createUserService.execute({
			name,
			email,
			password,
		});
		return res.json(instanceToInstance(user));
	}

	public async sessions(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;
		const createSessionsService = new CreateSessionsServices();
		const user = await createSessionsService.execute({
			email,
			password,
		});
		return res.json(instanceToInstance(user));
	}
}

export default UserController;
