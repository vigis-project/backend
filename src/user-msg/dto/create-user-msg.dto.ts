export class CreateUserMsgDto {
	readonly userId: number;
	readonly text: string;
	readonly notes: string;
	readonly statusId: number;
	readonly type: number;
}
