import { UserMsg } from 'src/user-msg/models/user-msg.model';

export class UserMsgDtoResponse {
	id: number;
	userId: number;
	text: string;
	notes: string;
	status: string;
	type: number;

	constructor(
		id: number,
		userId: number,
		text: string,
		notes: string,
		status: string,
		type: number
	) {
		this.id = id;
		this.userId = userId;
		this.text = text;
		this.notes = notes;
		this.status = status;
		this.type = type;
	}

	static fromUserMsg(userMsg: UserMsg) {
		return new UserMsgDtoResponse(
			userMsg.id,
			userMsg.userId,
			userMsg.text,
			userMsg.notes,
			userMsg.status.name,
			userMsg.type
		);
	}
}
