import { ICategory } from '../models/ICategory';

export interface ICategoriesRepository {
	findAll(): Promise<ICategory[] | null>;
	findById(id: string): Promise<ICategory | null>;
	findByName(name: string): Promise<ICategory | null>;
	create(name: string): Promise<ICategory>;
	save(category: ICategory): Promise<ICategory>;
	remove(category: ICategory): Promise<void>;
}
