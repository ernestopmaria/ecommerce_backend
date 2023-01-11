import ListCategoryService from '@modules/products/services/categoryServices/ListCategoriesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCategoryService from '@modules/products/services/categoryServices/CreateCategoryService';

export default class CategoryController {
	public async index(req: Request, res: Response) {
		const listCategoryService = container.resolve(ListCategoryService);
		const category = await listCategoryService.execute();
		return res.json(category);
	}
	public async create(req: Request, res: Response) {
		const { name } = req.body;
		const createCategoryService = container.resolve(CreateCategoryService);
		const category = await createCategoryService.execute(name);
		return res.json(category);
	}
}
