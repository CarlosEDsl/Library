import { PersonDTO } from "../models/dto/PersonDTO";
import { Person } from "../models/Person";
import { PersonRepository } from "../repositories/PersonRepository";

export class PersonService {
    
    personRepository = PersonRepository.getInstance();

    async registerPerson(personDTO:PersonDTO) {
        const person = this.dtoToPerson(personDTO);
        this.emailVerifier(person.email);

        return await this.personRepository.insertPerson(person);
    }

    async editPerson(person:Person) {
        if((await this.personRepository.findPersonById(person.id)).email != person.email)
            this.emailVerifier(person.email);
        if(!(await this.personRepository.findPersonById(person.id)))
            throw new Error(`id: ${person.id} don't exist in persons`);

        return await this.personRepository.updatePerson(person);
    }

    async deletePerson(person:Person) {
        const deletePersonId = await this.personRepository.findPersonById(person.id);
        const deletePersonEmail =  await this.personRepository.findPersonByEmail(person.email);

        if(deletePersonId != deletePersonEmail) {
            throw new Error("Email and ID don't match");
        }

        return await this.personRepository.deletePerson(person.id);
    }
    
    async findPerson(id:number) {
        const person = await this.personRepository.findPersonById(id);
        return person;
    }

    async getAllPerson() {
        return await this.personRepository.findAllPersons();
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