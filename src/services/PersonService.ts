import { PersonDTO } from "../models/dto/PersonDTO";
import { Person } from "../models/Person";
import { PersonRepository } from "../repositories/PersonRepository";
import { isEqual } from "../utils.ts/objectsUtils";

export class PersonService {
    
    personRepository = PersonRepository.getInstance();

    async registerPerson(personDTO:PersonDTO) {
        const person = this.dtoToPerson(personDTO);
        try {
            await this.emailVerifier(person.email);
        } catch(err) {
            throw err;
        }

        return await this.personRepository.insertPerson(person);
    }

    async editPerson(personDTO:PersonDTO) {
        const person = this.dtoToPerson(personDTO);
        person.id = personDTO.id?? 0;
        try{
            console.log(await this.personRepository.findPersonById(person.id));
            if(!(await this.personRepository.findPersonById(person.id)))
                throw new Error(`id: ${person.id} don't exist in persons`);
            if((await this.personRepository.findPersonById(person.id)).email != person.email)
                await this.emailVerifier(person.email);
        } catch(err) {
            throw err;
        }

        return await this.personRepository.updatePerson(person);
    }

    async deletePerson(personDTO:PersonDTO) {
        const person = this.dtoToPerson(personDTO);
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
        if(await this.personRepository.findPersonByEmail(email)) {
            throw new Error("email already in use");
        }
    }

    dtoToPerson(dto:PersonDTO) {
        return new Person(dto.name, dto.email);
    }

}