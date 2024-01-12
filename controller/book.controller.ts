export class BookController{
    BookRepository: any;
    constructor(BookRepository) {
        this.BookRepository = null;
        this.BookRepository = BookRepository;
    }
    listBooks(req, res) {
        res.status(200).json(this.BookRepository.getBooks());
    }
    getBook(req, res) {
        const { bookId } = req.params;
        const book = this.BookRepository.getBook(parseInt(bookId));
        if (!book) {
            res.status(404).json({ error: "book not found" });
        }
        res.status(200).json(book);
    }
    addBook(req, res) {
        const { bookId, book_title, author, genre } = req.body;
        const id = this.BookRepository.addBook( bookId,book_title,author,genre);
        res.status(201).json({ id: id });
    }
}
