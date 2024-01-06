import { Database } from "sqlite";
import {person} from "../model/person.model.js";

export  class PersonRepository{
    private db: Database = null;
    constructor(db:Database){
        this.db = db
    }

    async findPersons(
        firstNameLike: string,
        lastNameLike: string,
        companyLike: string,
        addressLike: string
    ): Promise<person[]>{
        return null
    }
    async addPerson(person:person): Promise<number>{
        const result = await this.db.run(
            "INSERT INTO person (first_name, last_name, company, address) VALUES(?,?,?,?);",
            person.firstName, person.lastName, person.company, person.address
        )
        return result.lastID
    }
    async updatePerson(personID:number,person: person): Promise< boolean>{
        return null
    }
    async deletePerson(personID:number){

    }



}




