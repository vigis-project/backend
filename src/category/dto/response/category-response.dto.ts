import { Category } from 'src/category/models/category.model';

export class CategoryDtoResponse {
	categoryId: number;
	name: string;
	parentId: number | undefined;
	multiSelect: boolean;

	constructor(
		categoryId: number,
		name: string,
		parentId: number | undefined,
		multiSelect: boolean
	) {
		this.categoryId = categoryId;
		this.name = name;
		this.parentId = parentId;
		this.multiSelect = multiSelect;
	}

	static fromCategory(category: Category) {
		return new CategoryDtoResponse(
			category.categoryId,
			category.name,
			category.parentId,
			category.multiSelect
		);
	}
}
