import { Request, Response } from 'express';
import ListProductService from '../../products/services/ListProductService';
import ListCustomerService from '../../customers/services/ListCustomerService';
import ListOrdersServices from '../../orders/services/ListOrdersService';

export default class DashoardController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listProductService = new ListProductService();
		const listCustomerService = new ListCustomerService();
		const listOrdersService = new ListOrdersServices();

		const products = await listProductService.execute();
		const customers = await listCustomerService.execute();
		const orders = await listOrdersService.execute();
		return res.json({
			products: products.length,
			customers: customers.length,
			orders: orders.length,
		});
	}
}
