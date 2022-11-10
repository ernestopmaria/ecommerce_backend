import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCostumerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomerController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listCustomersService = new ListCustomerService();
		const customers = await listCustomersService.execute();
		return res.json(customers);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const showCustomerService = new ShowCustomerService();
		const product = await showCustomerService.execute({ id });
		return res.json(product);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email } = req.body;
		const createCustomerService = new CreateCustomerService();
		const customer = await createCustomerService.execute({
			name,
			email
		});
		return res.json(customer);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, email } = req.body;
		const updateCustomerService = new UpdateCustomerService();
		const customer = await updateCustomerService.execute({
			id,
			name,
			email
		});
		return res.json(customer);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const deletecustomerService = new DeleteCustomerService();
		await deletecustomerService.execute({ id });
		return res.json('Cliente Deletado!');
	}
}
