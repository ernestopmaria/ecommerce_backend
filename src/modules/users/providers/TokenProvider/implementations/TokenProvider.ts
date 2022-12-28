import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import { ITokenProvider } from '../models/ITokenProvider';

class TokenProvider implements ITokenProvider {
	public async sign(response: any): Promise<string> {
		const token = jwt.sign(response, authConfig.jwt.secret, {
			expiresIn: authConfig.jwt.expiresIn,
		});

		return token;
	}
}

export default TokenProvider;
