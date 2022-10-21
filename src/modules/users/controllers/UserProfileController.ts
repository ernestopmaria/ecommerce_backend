import { Request, Response } from 'express';
import ShowUserProfileService from '../services/ShowUserProfileService';

class UserProfileController {
	public async show(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id     
		const userProfileService = new ShowUserProfileService();
		const user = await userProfileService.execute(user_id);
		return res.json(user);
	}
}

export default UserProfileController;
