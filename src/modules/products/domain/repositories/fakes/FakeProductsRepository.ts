import { ICreateProduct } from '../../models/ICreateProduct';
import { IFindProducts } from '../../models/IFindProduct';
import { IProduct } from '../../models/IProduct';
import { IProductPaginate } from '../../models/IProductPaginate';
import { IUpdateStockProduct } from '../../models/IUpdateStockProduct';
import { IProductsRepository } from '../IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Products';
import { randomUUID } from 'node:crypto';
import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';

export default class FakeProductsRepository implements IProductsRepository {
	public products: Product[] = [];

	async create(data: ICreateProduct): Promise<IProduct> {
		const products = new Product();
		products.id = randomUUID();
		(products.name = data.name), (products.quantity = data.quantity);
		this.products.push(products);
		return products;
	}
	public async findByName(name: string): Promise<IProduct | null> {
		return this.products.find(c => c.name === name) as unknown as null;
	}

	public async findById(id: string): Promise<IProduct | null> {
		return this.products.find(c => c.id === id) as unknown as null;
	}
	async findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate> {
		const result = {
			per_page: take,
			total: 1,
			current_page: page,
			data: this.products,
		};
		return result;
	}
	async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
		const product = this.products.includes(products);
		return product;
	}
	async save(product: IProduct): Promise<IProduct> {
		throw new Error('Method not implemented.');
	}
	async updateStock(products: IUpdateStockProduct[]): Promise<void> {
		throw new Error('Method not implemented.');
	}
	async remove(product: IProduct): Promise<void> {
		const productIndex = this.products.findIndex(e => e.id === product.id);
		this.products.splice(productIndex, 1);
	}
}
