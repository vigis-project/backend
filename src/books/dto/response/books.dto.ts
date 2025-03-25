import { Book } from 'src/books/models/books.model';

export class BookDtoResponse {
	id: number;
	bookName: string;
	note: string;
	authorId: number;

	constructor(id: number, bookName: string, note: string, authorId: number) {
		this.id = id;
		this.bookName = bookName;
		this.note = note;
		this.authorId = authorId;
	}

	static fromBook(book: Book) {
		return new BookDtoResponse(
			book.id,
			book.bookName,
			book.note,
			book.authorId
		);
	}
}
