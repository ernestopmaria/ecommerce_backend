import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder';
import { IOrder } from '../domain/models/IOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
class CreateOrderService {
	constructor(
		@inject('OrdersRepository')
		private ordersRepository: IOrdersRepository,

		@inject('CustomerRepository')
		private customerRepository: ICustomersRepository,

		@inject('ProductRepository')
		private productRepository: IProductsRepository,
	) {}
	public async execute({
		customer_id,
		products,
	}: IRequestCreateOrder): Promise<IOrder> {
		const customerExists = await this.customerRepository.findById(customer_id);

		if (!customerExists) {
			throw new AppError('Cliente não encontrado');
		}

		const productExists = await this.productRepository.findAllByIds(products);

		if (!productExists.length) {
			throw new AppError('Productos não encontrados');
		}

		const productExistsIds = productExists.map(product => product.id);

		const checkInexistentProducts = products.filter(
			product => !productExistsIds.includes(product.id),
		);

		if (checkInexistentProducts.length) {
			throw new AppError(
				`Producto não encontrado ${checkInexistentProducts[0].id}.`,
			);
		}

		const quantityAvailable = products.filter(
			product =>
				productExists.filter(p => p.id === product.id)[0].quantity <
				product.quantity,
		);

		if (quantityAvailable.length) {
			throw new AppError(
				`A quantidade ${quantityAvailable[0].quantity} 
                não está disponível para o ${quantityAvailable[0].id}.`,
			);
		}

		const serializedProducts = products.map(product => ({
			product_id: product.id,
			quantity: product.quantity,
			price: productExists.filter(p => p.id === product.id)[0].price,
			total:
				product.quantity *
				productExists.filter(p => p.id === product.id)[0].price,
		}));

		const order = await this.ordersRepository.createOrder({
			customer: customerExists,
			products: serializedProducts,
		});

		const { order_products } = order;

		const updatedProductQuantity = order_products.map(product => ({
			id: product.product_id,
			quantity:
				productExists.filter(p => p.id === product.product_id)[0].quantity -
				product.quantity,
		}));

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');
		await redisCache.invalidate('api-vendas-ORDER_LIST');

		await this.productRepository.updateStock(updatedProductQuantity);

		return order;
	}
}
export default CreateOrderService;
