import { BookReview } from 'src/books/models/book-review.models';

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
		this.userId = userId;
	}

	static fromReview(bookReview: BookReview): BookReviewResponseDto {
		return new BookReviewResponseDto(
			bookReview.id,
			bookReview.review,
			bookReview.note,
			bookReview.bookId,
			bookReview.userId
		);
	}
}
