import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ListOrdersServices from '../services/ListOrdersService';
import ShowOrderService from '../services/ShowOrderService';

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
		console.log(order);
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
