export class BookResponseDto {
	id: number;
	bookName: string;
	note: string;
	rating: number;
	authorId: number;

	constructor(id: number, bookName: string, note: string, authorId: number) {
		this.id = id;
		this.bookName = bookName;
		this.note = note;
		this.authorId = authorId;
	}
}
