import { ITokenProvider } from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
	public async sign(response: any): Promise<string> {
		return response;
	}
}

export default FakeTokenProvider;
