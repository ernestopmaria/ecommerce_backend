import { Request, Response } from 'express';
import ShowUserProfileService from '../services/ShowUserProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class UserProfileController {
	public async show(req: Request, res: Response): Promise<Response> {
		const userProfileService = new ShowUserProfileService();


        const user_id = req.user.id     
		const user = await userProfileService.execute({user_id});
		return res.json(user);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id
		const { name, email, password , old_password} = req.body;
		const updateProfileService = new UpdateProfileService();
		const user = await updateProfileService.execute({
			user_id,
			name,
			email,
			password,
			old_password
		});
		return res.json(user);
	}
}

export default UserProfileController;
