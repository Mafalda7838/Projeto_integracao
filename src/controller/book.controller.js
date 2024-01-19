import { Request, Response } from 'express'


export class bookController{

    private bookRepository: bookRepository = null

    constructor(bookRepository :bookRepository) {
        this.bookRepository = bookRepository
    }

    async listabook(req: Request, res: Response){
        const book = await this.bookRepository.getbooks()
        res.status(200).json(book)
    }

    async getbooks(req: Request, res: Response){
        const { bookId } = req.params
        const book = await this.BookRepository.getbookById(parseInt(bookId))

        if(!book){
            res.status(404).json({error: "book not found"})
            return
        }

        res.status(200).json(book)
    }


    async getbookByGenre(req: Request, res: Response){
        const { genreId } = req.params
        const book = await this.bookRepository.getbookByGenreId(parseInt(genreId))

        if(!book){
            res.status(404).json({error: "book not found"})
        }

        res.status(200).json(book)
    }
    

    async addbook(req: Request, res: Response) {
        const { bookId, personId, book_titlr, genre} = req.body
    
        try {
            const result = await this.bookRepository.addbook(bookId, personId, book_titlr, genre)
    
            if (typeof result === 'string') {
                res.status(409).json({ error: result })
            } else {
                res.status(201).json({ id: result })
            }
        } catch (error) {
            console.error('Error adding:', error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
    
    async deletebook(req: Request, res: Response) {
        const { bookId } = req.params

        const deletedbook = await this.bookRepository.deletebookById(parseInt(bookId))

        if (!deletedbook) {
            res.status(404).json({ error: "book not found" })
            return
        }

        res.status(200).json({ message: "book deleted successfully" })
    }

}