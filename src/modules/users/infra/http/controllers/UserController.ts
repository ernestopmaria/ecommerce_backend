import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';

import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import ShowUserService from '@modules/users/services/ShowUserService';

class UserController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listUSerService = container.resolve(ListUserService);
		const user = await listUSerService.execute();

		return res.json(instanceToInstance(user));
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password, role } = req.body;
		const createUserService = container.resolve(CreateUserService);
		const user = await createUserService.execute({
			name,
			email,
			password,
			role,
		});
		return res.json(instanceToInstance(user));
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const showUser = container.resolve(ShowUserService);

		const user = await showUser.execute({ id });

		return response.json(user);
	}
}

export default UserController;
