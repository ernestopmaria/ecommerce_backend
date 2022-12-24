import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOrderFieldToOrders1671891299918 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'orders',
			new TableColumn({
				name: 'order',
				type: 'int',
				isGenerated: true,
				generationStrategy: 'increment',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('orders', 'order');
	}
}
