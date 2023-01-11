import { ICategory } from '../../models/ICategory';
import { ICategoriesRepository } from '../ICategoriesRepository';
import { randomUUID } from 'node:crypto';

export class FakeCategoriesRepository implements ICategoriesRepository {
	public categories: ICategory[] = [];

	async findAll(): Promise<ICategory[] | null> {
		const categories = this.categories;
		return categories;
	}
	async findById(id: string): Promise<ICategory | null> {
		const category = this.categories.find(e => e.id === id) as unknown as null;
		return category;
	}
	async findByName(name: string): Promise<ICategory | null> {
		const category = this.categories.find(
			e => e.name === name,
		) as unknown as null;
		return category;
	}
	async create(name: string): Promise<ICategory> {
		const category: ICategory = {
			id: randomUUID(),
			name,
			created_at: new Date(),
			updated_at: new Date(),
		};
		this.categories.push(category);
		return category;
	}
	async save(category: ICategory): Promise<ICategory> {
		const categoryIndex = this.categories.findIndex(e => e.id === category.id);
		this.categories[categoryIndex] = category;
		return category;
	}
	async remove(category: ICategory): Promise<void> {
		const categoryIndex = this.categories.findIndex(e => e.id === category.id);
		this.categories.splice(categoryIndex, 1);
	}
}
