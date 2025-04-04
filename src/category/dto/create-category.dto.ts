export class CreateCategoryDto {
	readonly name: string;
	readonly parentId?: number;
	readonly multiSelect: boolean;
}
