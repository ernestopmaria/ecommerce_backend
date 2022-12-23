import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCostumerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import { Request, Response } from 'express';

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
			email,
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
			email,
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
