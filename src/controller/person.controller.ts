import { Handler, Request, Response } from "express";
import { BookRepository } from "../repository/book.repository.js";
import { PersonRepository } from "../repository/person.repository.js";
import { person } from "../model/person.model.js";

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

        }

    }
    addPersons() : Handler {
        return async (req: Request, res: Response) =>{
            const person: person = req.body

            const personId = await this. personRepository.addPerson(person)

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