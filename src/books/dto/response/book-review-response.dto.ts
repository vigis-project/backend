export class BookReviewResponseDto {
	id: number;
	review: string;
	note: string;
	bookId: number;
	userId: number;

	constructor(
		id: number,
		review: string,
		note: string,
		bookId: number,
		userId: number
	) {
		this.id = id;
		this.review = review;
		this.note = note;
		this.bookId = bookId;
		this.userId;
	}
}
