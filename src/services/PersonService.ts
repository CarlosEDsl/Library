import { PersonDTO } from "../models/dto/PersonDTO";
import { Person } from "../models/Person";
import { PersonRepository } from "../repositories/PersonRepository";

export class PersonService {
    
    personRepository = PersonRepository.getInstance();

    async createPerson(personDTO:PersonDTO) {
        const person = this.dtoToPerson(personDTO);
        this.emailVerifier(person.email);

        return await this.personRepository.insertPerson(person);
    }

    async emailVerifier(email:string) {
        if(this.personRepository.findPersonByEmail(email) != null) {
            throw new Error("email already in use");
        }
    }

    dtoToPerson(dto:PersonDTO) {
        return new Person(dto.email, dto.name);
    }

}