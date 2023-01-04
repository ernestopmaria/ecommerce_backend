export interface IRedisProvider {
	save(key: string, value: any): Promise<void>;
	recover<T>(key: string): Promise<T | null>;
	invalidate(key: string): Promise<void>;
}
