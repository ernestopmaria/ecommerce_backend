import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrdersServices from '@modules/orders/services/ListOrdersService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';

export default class OrdersController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listOrderService = new ListOrdersServices();
		const orders = await listOrderService.execute();
		return res.json(orders);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const showOrderService = new ShowOrderService();
		const order = await showOrderService.execute({ id });
		return res.json(order);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { customer_id, products } = req.body;
		const createOrderService = new CreateOrderService();
		const order = await createOrderService.execute({
			customer_id,
			products,
		});

		return res.json(order);
	}

	/* 	public async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, price, quantity } = req.body;
		const updateProductService = new UpdateProductService();
		const product = await updateProductService.execute({
			id,
			name,
			price,
			quantity,
		});
		return res.json(product);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const deleteProductService = new DeleteProductService();
		await deleteProductService.execute({ id });
		return res.json('Producto Deletado!');
	} */
}
