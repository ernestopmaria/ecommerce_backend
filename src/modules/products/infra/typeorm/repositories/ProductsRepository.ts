import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { In, Repository } from 'typeorm';
import Product from '../entities/Products';

interface IFindProducts {
	id: string;
}

export class ProductRepository implements IProductsRepository {
	private ormRepository: Repository<Product>;
	constructor() {
		this.ormRepository = dataSource.getRepository(Product);
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

	public async findByName(name: string): Promise<Product | null> {
		const product = await this.ormRepository.findOneBy({
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

	public async findById(id: string): Promise<Product | null> {
		const product = await this.ormRepository.findOneBy({ id });

		return product;
	}

	public async findAll({
		page,
		skip,
		take,
	}: SearchParams): Promise<IProductPaginate> {
		const [products, count] = await this.ormRepository
			.createQueryBuilder()
			.skip(skip)
			.take(take)
			.getManyAndCount();

		const result = {
			per_page: take,
			total: count,
			current_page: page,
			data: products,
		};

		return result;
	}
}
