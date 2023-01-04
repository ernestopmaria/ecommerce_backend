import 'reflect-metadata';
import 'dotenv/config';

import { app } from './app';
import { dataSource } from '../typeorm/index';

dataSource.initialize().then(() => {
	const server = app.listen(3333, () => {
		console.log('Server started on port 3333');
	});
});
