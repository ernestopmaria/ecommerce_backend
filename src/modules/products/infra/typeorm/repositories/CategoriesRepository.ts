import { ICategory } from '@modules/products/domain/models/ICategory';
import { ICategoriesRepository } from '@modules/products/domain/repositories/ICategoriesRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/Category';

export class CategoriesRepository implements ICategoriesRepository {
	private ormRepository: Repository<Category>;
	constructor() {
		this.ormRepository = dataSource.getRepository(Category);
	}

	async findAll(): Promise<ICategory[] | null> {
		const category = await this.ormRepository.find();
		return category;
	}
	async findById(id: string): Promise<ICategory | null> {
		const category = await this.ormRepository.findOneBy({ id });
		return category;
	}

	async findByName(name: string): Promise<ICategory | null> {
		const category = await this.ormRepository.findOneBy({ name });
		return category;
	}
	async create(name: string): Promise<ICategory> {
		const category = this.ormRepository.create({ name });
		await this.ormRepository.save(category);
		return category;
	}
	async save(category: ICategory): Promise<ICategory> {
		await this.ormRepository.save(category);
		return category;
	}
	async remove(category: ICategory): Promise<void> {
		await this.ormRepository.remove(category);
	}
}
