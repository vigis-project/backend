export class CreateBookReviewDto {
	readonly review: string;
	readonly note: string;
	readonly bookId: number;
	readonly userId: number;
}
