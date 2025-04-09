import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TablesService {
	constructor(private sequelize: Sequelize) {}

	async getTableFields(table: string) {
		const model = Object.values(this.sequelize.models).find(
			(m) => m.getTableName().toString() === table
		);
		if (!model) return null;

		return Object.entries(model.getAttributes()).map(
			([fieldName, attribute]) => ({
				name: fieldName,
				type: (attribute.type as any).key,
				allowNull: attribute.allowNull !== false,
				primaryKey: !!attribute.primaryKey,
				defaultValue: attribute.defaultValue,
				autoIncrement: !!attribute.autoIncrement
				// Add more properties as needed
			})
		);
	}
}
