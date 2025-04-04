import { Category } from 'src/category/models/category.model';
import { UserList } from 'src/user-list/models/user-list.model';
import { UserValueCategory } from '../../models/user-value-category.model';

export class UserValueCategoryDtoResponse {
	id: number;
	userList: number;
	category: string;

	constructor(
		id: number,
		userList: UserList | null,
		category: Category | null
	) {
		this.id = id;
		this.userList = userList?.id ?? 0;
		this.category = category?.name ?? 'Unknown';
	}

	static fromUserValueCategory(entity: UserValueCategory) {
		return new UserValueCategoryDtoResponse(
			entity.idUserValueCategory,
			entity.userList ?? null,
			entity.category ?? null
		);
	}
}
