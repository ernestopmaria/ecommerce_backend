import { Request, Response } from 'express';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

class UserProfileController {
	public async show(req: Request, res: Response): Promise<Response> {
		const userProfileService = container.resolve(ShowUserProfileService);

		const user_id = req.user.id;
		const user = await userProfileService.execute({ user_id });
		return res.json(instanceToInstance(user));
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;
		const { name, email, password, old_password } = req.body;
		const updateProfileService = new UpdateProfileService();
		const user = await updateProfileService.execute({
			user_id,
			name,
			email,
			password,
			old_password,
		});
		return res.json(instanceToInstance(user));
	}
}

export default UserProfileController;
