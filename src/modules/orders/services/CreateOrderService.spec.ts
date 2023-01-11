import FakeCustomerRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import FakeRedisCache from '@shared/cache/RedisCacheProvider/fakes/FakeRedisCache';
import FakeOrdersRepository from '../domain/repositories/fakes/FakeOrdersRepository';
import CreateOrderService from './CreateOrderService';
import { IProduct } from '../../products/domain/models/IProduct';
import AppError from '@shared/errors/AppError';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeCustomerRepository: FakeCustomerRepository;
let ordersService: CreateOrderService;
let fakeRediscache: FakeRedisCache;

describe('Create orders', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		fakeProductsRepository = new FakeProductsRepository();
		fakeOrdersRepository = new FakeOrdersRepository();
		fakeRediscache = new FakeRedisCache();
		ordersService = new CreateOrderService(
			fakeOrdersRepository,
			fakeCustomerRepository,
			fakeProductsRepository,
			fakeRediscache,
		);
	});

	it('should create a order', async () => {
		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});
		const customer_id = customer.id;
		const products: IProduct[] = [
			{
				name: product.name,
				id: product.id,
				quantity: 1,
				price: product.price,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		const orders = await ordersService.execute({ customer_id, products });
		expect(orders).toHaveProperty('order_products');
	});

	it('should throw when customer does not exists', async () => {
		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});
		const customer_id = 'fake_customer_id';
		const products: IProduct[] = [
			{
				name: product.name,
				id: product.id,
				quantity: 1,
				price: product.price,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		await expect(
			ordersService.execute({ customer_id, products }),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when product does not exists', async () => {
		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});
		const customer_id = customer.id;
		const products: IProduct[] = [
			{
				name: product.name,
				id: 'fake_product_id',
				quantity: 1,
				price: product.price,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		await expect(
			ordersService.execute({ customer_id, products }),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when product does not exists in the array of products', async () => {
		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});
		const customer_id = customer.id;
		const products: IProduct[] = [
			{
				name: product.name,
				id: product.id,
				quantity: 1,
				price: product.price,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: product.name,
				id: 'fake_product_id',
				quantity: 1,
				price: product.price,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		await expect(
			ordersService.execute({ customer_id, products }),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should throw when product quantity is not enought', async () => {
		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 1,
		});
		const customer_id = customer.id;
		const products: IProduct[] = [
			{
				name: product.name,
				id: product.id,
				quantity: 5,
				price: product.price,
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		await expect(
			ordersService.execute({ customer_id, products }),
		).rejects.toBeInstanceOf(AppError);
	});
});
