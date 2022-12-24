import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Products';

interface IFindProducts {
	id: string;
}

export class ProductRepository implements IProductsRepository {
	private ormRepository: Repository<Product>;
	constructor() {
		this.ormRepository = getRepository(Product);
	}
	public async create({
		name,
		price,
		quantity,
	}: ICreateProduct): Promise<Product> {
		const product = this.ormRepository.create({ name, price, quantity });

		await this.ormRepository.save(product);

		return product;
	}

	public async save(product: Product): Promise<Product> {
		await this.ormRepository.save(product);

		return product;
	}

	public async remove(product: Product): Promise<void> {
		await this.ormRepository.remove(product);
	}

	public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
		await this.ormRepository.save(products);
	}

	public async findByName(name: string): Promise<Product | undefined> {
		const product = await this.ormRepository.findOne({
			name,
		});

		return product;
	}

	public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
		const productsIds = products.map(product => product.id);

		const existsProducts = await this.ormRepository.find({
			where: {
				id: In(productsIds),
			},
		});

		return existsProducts;
	}

	public async findById(id: string): Promise<Product | undefined> {
		const product = await this.ormRepository.findOne({ id });

		return product;
	}

	public async findAll(): Promise<Product[]> {
		const result = await this.ormRepository.find();

		return result;
	}
}
