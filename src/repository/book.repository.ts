import { Database } from "sqlite";
import { book } from "../model/book.model.js";

export class BookRepository{
    private db: Database = null;
    constructor(db:Database) {
        this.db= db
    }

    async findBook(personID:number): Promise<book[]> {
        
        const records = await this.db.all(
            "SELECT book_id, book_title, author, genre FROM book WHERE book_id = ?; "
            
        );

        return records.map((record): book =>{
            return {
                bookId: record.book_id,
                book_title: record.book_title,
                author: record.author,
                genre: record.genre
            }
        })



        return null;
    }
    async addBook(book: book){
        await this.db.run(
            "INSERT INTO book (book_id, book_title, author, genre) VALUES (?;?;?;?);",
            book.bookId, book.book_title, book.author, book.genre
        )
        
    

    }
    async updateBook (BookID: number, book_title: string, author: string, genre:string){
        const result= await this.db.run(
            "UPDATE book SET book_title = ?, author = ?, genre = ? WHERE id = ?",
            book_title, author, genre
        )
        return !!result.changes
    }


    async deleteBook (personId: number, type: string){

        await this.db.run(
            "DELETE FROM book WHERE person_id = ?; ", personId
        )
                
    }
    
}