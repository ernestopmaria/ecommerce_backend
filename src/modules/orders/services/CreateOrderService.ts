import { getCustomRepository } from 'typeorm';
import Order from '@modules/orders/typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import CustomerRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IProduct {
	id: string;
	quantity: number;
}

interface IRequest {
	customer_id: string;
	products: IProduct[];
}

class CreateOrderService {
	public async execute({ customer_id, products }: IRequest): Promise<Order> {
		const orderRepository = getCustomRepository(OrdersRepository);
		const customerRepository = getCustomRepository(CustomerRepository);
		const productRepository = getCustomRepository(ProductRepository);

		const customerExists = await customerRepository.findById(customer_id);

		if (!customerExists) {
			throw new AppError('Cliente não encontrado');
		}

		const productExists = await productRepository.findAllByIds(products);

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

		const order = await orderRepository.createOrder({
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
		const redisCache = new RedisCache();

		await redisCache.invalidate('api-vendas-PRODUCT_LIST');
		await redisCache.invalidate('api-vendas-ORDER_LIST');

		await productRepository.save(updatedProductQuantity);

		return order;
	}
}
export default CreateOrderService;
