import { Request, Response } from 'express';
import UpdateUserAvatarServices from '../services/UpdateUserAvatarServices';

class UserAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateUserAvatarServices = new UpdateUserAvatarServices();
		const user = await updateUserAvatarServices.execute({
			avatarFilename: req.file?.filename as string,
			user_id: req.user.id,
		});
		return res.json(user);
	}
}

export default UserAvatarController;
