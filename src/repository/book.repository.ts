import { Database } from "sqlite";
import { book } from "../model/book.model.js";

export class BookRepository{
    private db: Database = null;
    constructor(db:Database) {
        this.db= db
    }

    async findBook(personID:number): Promise<book[]> {
        return null;
    }
    async addBook(book: book){
        await this.db.run(
            "INSERT INTO book (book_id, book_title, author, genre) VALUES (?;?;?;?);",
            book.bookId, book.book_title, book.author, book.genre
        )
        
    }
    async updateBook (BookID: number, book_title: string, author: string, genre:string){

    }

    //async deleteBook (personId: number, type: string){

   // }
    //async deleteBook (BookID: number){

    //}
}