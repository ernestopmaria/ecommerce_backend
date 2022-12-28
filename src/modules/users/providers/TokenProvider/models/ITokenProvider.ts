export interface ITokenProvider {
	sign(response: any): Promise<string>;
}
