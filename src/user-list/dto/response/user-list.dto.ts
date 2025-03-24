import { UserList } from '../../models/user-list.model';
import { TypeList } from 'src/user-list/models/type-list.model';
import { List } from 'src/user-list/models/list.model';

export class UserListDtoResponse {
	id: number;
	typeList: TypeList;
	list: List;

	constructor(userList: UserList) {
		this.id = userList.id;
		this.typeList = userList.typeList;
		this.list = userList.list;
	}

	static fromUserList(userList: UserList) {
		return new UserListDtoResponse(userList);
	}
}
