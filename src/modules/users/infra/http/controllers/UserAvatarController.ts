import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserAvatarServices from '@modules/users/services/UpdateUserAvatarServices';
import { container } from 'tsyringe';

class UserAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateUserAvatarServices = container.resolve(
			UpdateUserAvatarServices,
		);
		const user = await updateUserAvatarServices.execute({
			avatarFilename: req.file?.filename as string,
			user_id: req.user.id,
		});
		return res.json(instanceToInstance(user));
	}
}

export default UserAvatarController;
