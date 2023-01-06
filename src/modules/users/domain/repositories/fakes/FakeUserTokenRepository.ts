import { IUserToken } from '../../models/IUserToken';
import { IUserTokensRepository } from '../IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { randomUUID } from 'node:crypto';

export default class FakeUserTokenRepository implements IUserTokensRepository {
	public userToken: IUserToken[] = [];

	public async findByToken(token: string): Promise<IUserToken | null> {
		const userT = this.userToken.filter(e => e.token === token)[0];

		return userT;
	}
	public async generate(user_id: string): Promise<IUserToken> {
		const userT = new UserToken();
		userT.id = randomUUID();
		userT.token = randomUUID();
		userT.user_id = user_id;
		this.userToken.push(userT);
		return userT;
	}
}
