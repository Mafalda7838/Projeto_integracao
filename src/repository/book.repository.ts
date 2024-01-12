import { Database } from "sqlite";
import { book } from "../model/book.model.js";

export class BookRepository{
    private db: Database = null;
    constructor(db:Database) {
        this.db= db
    }

    async findBook(personID:number): Promise<book[]> {
        
        const records = await this.db.all(
            "SELECT book_id, person_id ,book_title, genre FROM book WHERE book_id = ?; "
            
        );

        return records.map((record): book =>{
            return {
                bookId: record.book_id,
                personId: record.person_id,
                book_title: record.book_title,
                genre: record.genre
            }
        })



        return null;
    }
    async addBook(book: book){
        await this.db.run(
            "INSERT INTO book (book_id, personId, book_title, genre) VALUES (?;?;?;?);",
            book.bookId, book.personId, book.book_title, book.genre
        )
        
    

    }
    async updateBook (BookID: number, personId:number, book_title: string, genre:string){
        const result= await this.db.run(
            "UPDATE book SET book_title = ?,personId =?, genre = ? WHERE id = ?",
            book_title, personId, genre
        )
        return !!result.changes
    }


    async deleteBook (personId: number){

        await this.db.run(
            "DELETE FROM book WHERE person_id = ?; ", personId
        )
                
    }
    
}