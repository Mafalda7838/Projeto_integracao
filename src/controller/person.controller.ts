import { Handler, Request, Response } from "express";
import { BookRepository } from "../repository/book.repository.js";
import { PersonRepository } from "../repository/person.repository.js";
import { person } from "../model/person.model.js";
import { book } from "../model/book.model.js";
import { DetailedPerson } from "../model/dto/detailed_person.dto.js";

export class PersonController {
    
    private personRepository: PersonRepository = null;
    private bookRepository: BookRepository = null;
    
    constructor(
        personRepository: PersonRepository,
        bookRepository: BookRepository,
    ) {
        this.personRepository= personRepository
        this.bookRepository= bookRepository
    }

    findPersons() : Handler {

        const completePersonWithDetails = async (person: person): Promise<DetailedPerson> =>{
            const result: DetailedPerson = {
                ...person,
                book:[]
            
            }
            const book = await this.bookRepository.findBook(person.id)

            book.forEach(book => {
                result.book.push({
                    bookId: book.bookId,
                    book_title: book.book_title,
                    author: book.author,
                    genre: book.genre,
                })
            })
            return result
        }
        return async(req: Request, res: Response)=>{

            const {firstName, lastName, company, address}

            const person = await this.personRepository.findPersons(
                <string>firstName,
                <string>lastName,
                <string>company,
                <string>address,
            )
            const result: DetailedPerson[] = []
            for (const person of person){
                const DetailedPerson = await completePersonWithDetails(person)
                result.push(DetailedPerson)


            }
                res.status(200).json(person)
        }

    }
    addPersons() : Handler {
        return async (req: Request, res: Response) =>{
            const person: DetailedPerson = req.body

            const personId = await this. personRepository.addPerson(person)

            person.book.forEach(async book =>) {
                await this.bookRepository.addBook({
                    ...bookId,
                    bookId: personId
                })
            }

            res.status(201). json({id: personId})
            
        }

    }
    updatePerson() : Handler {
        return (req: Request, res: Response) =>{
            const personId = parseInt(req.params.personId)

            const person: DetailedPerson = req.body
            await this.personRepository.updatePerson(personId,person)
            const dbBook = await this .bookRepository.findBook(personId)
            const requestBook = person.Book

            // adicionar e fazer update
            requestBook.forEach(async(requestBook) =>{
                const dbBook = dbBook.find(
                    (dbBook)=> requestBook.book_title == dbBook.book_title
                )

                if(!dbBook){
                    //nao existe na db, adicionar 
                    console.log (`Adding ${personId} - ${requestBook.book_title} with ${requestBook.author}`)
                    await this.bookRepository.addBook({
                        ...bookId,
                        personId : personId
                    }) 
                } else if (dbBook.author != requestBook.author){
                    //foi atualizado, fazer update ao registro
                    console.log( `Updating ${personId} - ${dbBook.book_title} to ${requestBook.book_title}`)
                    await this.bookRepository.updateBook(
                        personId, dbBook.book_title, requestBook.author
                    )
                }
            })
            
        }

    }

    deletePersons() : Handler {
        return (req: Request, res: Response) => {
            const personId= parseInt(req.params.personId)

            await this.bookRepository.deleteBook(personId);
            await this.personRepository.deletePerson(personId)

            res.status(200).json()
            
        }

    }
}