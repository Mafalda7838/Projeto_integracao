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
        return (req: Request, res: Response)=>{
            const person = await this.personRepository.findPersons(
                null,null,null,null
            )
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
            
        }

    }
}