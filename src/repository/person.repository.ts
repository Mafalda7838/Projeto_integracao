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

        const params: string[] = [];
        let q = "SELECT id, first_name, last_name, company, address FROM person 1=1;"
        

        if (firstNameLike) {
            q += "AND first_name LIKE ? "
            params.push(firstNameLike)
        }
        if (lastNameLike) {
            q += "AND last_name LIKE ? "
            params.push(lastNameLike)
        }
        if (companyLike) {
            q += "AND company LIKE ? "
            params.push(companyLike)
        }
        if (addressLike) {
            q += "AND address LIKE ? "
            params.push(addressLike)
        }

        const records = await this.db.all(q,...params)

        return records.map((record): person => {
            return {
                id: record.id,
                firstName: record.first_name,
                lastName: record.last_name,
                company:record.company,
                address: record.address
            }
        })
        return null
    }
    async addPerson(person:person): Promise<number>{
        const result = await this.db.run(
            "INSERT INTO person (first_name, last_name, company, address) VALUES(?,?,?,?);",
            person.firstName, person.lastName, person.company, person.address
        )
        return result.lastID
    }
    async updatePerson(personID:number,{firstName,lastName, company, address}: person): Promise< boolean>{
        const result = await this.db.run(
            "UPDATE person SET first_name = ?, last_name= ?, company = ?, address = ? WHERE id = ?", 
            firstName, lastName, company, address, personID
        )
        return !!result.changes
    }
    
    async deletePerson(personID:number){
        await this.db.run(
            "DELETE FROM person WHERE id = ?", personID
        );
    }



}




