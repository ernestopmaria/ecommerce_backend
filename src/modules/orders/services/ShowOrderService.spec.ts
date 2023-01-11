import FakeCustomerRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import FakeProductsRepository from '@modules/products/domain/repositories/fakes/FakeProductsRepository';
import FakeOrdersRepository from '../domain/repositories/fakes/FakeOrdersRepository';
import ShowOrderService from './ShowOrderService';
import AppError from '@shared/errors/AppError';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeCustomerRepository: FakeCustomerRepository;
let ordersService: ShowOrderService;

describe('show orders', () => {
	beforeEach(async () => {
		fakeCustomerRepository = new FakeCustomerRepository();
		fakeProductsRepository = new FakeProductsRepository();
		fakeOrdersRepository = new FakeOrdersRepository();
		ordersService = new ShowOrderService(fakeOrdersRepository);
	});

	it('should return a orders', async () => {
		const page = 1;
		const limit = 15;

		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});
		const orderReturned = await fakeOrdersRepository.createOrder({
			customer: {
				id: customer.id,
				name: customer.name,
				email: customer.email,
				created_at: new Date(),
				updated_at: new Date(),
			},
			products: [
				{
					product_id: product.id,
					quantity: 2,
					price: 2500,
				},
			],
		});
		const id = orderReturned.id;

		const orders = await ordersService.execute({ id });

		expect(orders).toHaveProperty('order_products');
	});
	it('should throw when the order not exists', async () => {
		const page = 1;
		const limit = 15;

		const customer = await fakeCustomerRepository.create({
			name: 'Ernesto',
			email: 'ernestomaria93@gmail.com',
		});

		const product = await fakeProductsRepository.create({
			name: 'Ernesto',
			price: 2500,
			quantity: 12,
		});
		await fakeOrdersRepository.createOrder({
			customer: {
				id: customer.id,
				name: customer.name,
				email: customer.email,
				created_at: new Date(),
				updated_at: new Date(),
			},
			products: [
				{
					product_id: product.id,
					quantity: 2,
					price: 2500,
				},
			],
		});
		const id = 'fake_id';

		await expect(ordersService.execute({ id })).rejects.toBeInstanceOf(
			AppError,
		);
	});
});
