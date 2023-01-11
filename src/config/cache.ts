import { RedisOptions } from 'ioredis';

interface ICacheConfig {
	config: {
		redis: RedisOptions;
	};
	driver: string;
}
export default {
	config: {
		redis: {
			host: 'localhost',
			port: 6379,
			password: process.env.REDIS_PASS || undefined,
		},
	},
	driver: 'redis',
} as ICacheConfig;
