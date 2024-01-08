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
            
        }

    }

    deletePersons() : Handler {
        return (req: Request, res: Response) => {
            const personId= parseInt(req.params.personId)

            await this.bookRepository.deletebook(personId);
            await this.personRepository.deletePerson(personId)

            res.status(200).json()
            
        }

    }
}