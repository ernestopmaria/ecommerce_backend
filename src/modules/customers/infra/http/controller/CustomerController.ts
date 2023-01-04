import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';
import ShowCustomerService from '@modules/customers/services/ShowCostumerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

export default class CustomerController {
	public async index(req: Request, res: Response): Promise<Response> {
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 15;

		const listCustomers = container.resolve(ListCustomerService);
		const customers = await listCustomers.execute({ page, limit });
		return res.json(customers);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const showCustomerService = container.resolve(ShowCustomerService);
		const product = await showCustomerService.execute({ id });
		return res.json(product);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email } = req.body;
		const createCustomerService = container.resolve(CreateCustomerService);
		const customer = await createCustomerService.execute({
			name,
			email,
		});
		return res.json(customer);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, email } = req.body;
		const updateCustomerService = container.resolve(UpdateCustomerService);
		const customer = await updateCustomerService.execute({
			id,
			name,
			email,
		});
		return res.json(customer);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deletecustomerService = container.resolve(DeleteCustomerService);
		await deletecustomerService.execute({ id });
		return res.json('Cliente Deletado!');
	}
}
