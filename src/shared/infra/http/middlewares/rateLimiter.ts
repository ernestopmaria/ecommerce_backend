import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

export default async function rateLimiter(
	request: Request,
	response: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const redisClient = new Redis({
			host: 'localhost',
			port: 6379,
			password: process.env.REDIS_PASS,
		});

		const limiter = new RateLimiterRedis({
			storeClient: redisClient,
			keyPrefix: 'ratelimit',
			points: 5,
			duration: 1,
		});
		await limiter.consume(request.ip);
		next();
	} catch (err) {
		throw new AppError('Too many requests.', 429);
	}
}
