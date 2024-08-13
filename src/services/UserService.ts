import { UserDTO } from "../models/dto/UserDTO";
import { User } from "../models/User";
import { PersonRepository } from "../repositories/PersonRepository";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {

    userRepository:UserRepository = UserRepository.getInstance();
    personRepository:PersonRepository = PersonRepository.getInstance();

    async registerUser(userDTO:UserDTO) {
        const user = await this.dtoToUser(userDTO);
        this.personVerifier(user.personId);

        return await this.userRepository.updateUser(user);        
    }

    async editUser(user:User) {
        this.personVerifier(user.personId);
        return await this.userRepository.updateUser(user);
    }

    async deleteUser(user:User) {
        const deletePerson = await this.userRepository.findUser(user.id);
        if(deletePerson.personId != user.personId || deletePerson.password != user.password) {
            throw new Error("data don't match");
        }
        return await this.userRepository.deleteUser(user.id);
    }

    async findUser(id:number) {
        const user = await this.userRepository.findUser(id);
        return user;
    }

    async findUserByPersonId(id:number) {
        const user = await this.userRepository.findUserByPersonId(id);
        return user;
    }

    async getAllPerson() {
        return await this.personRepository.findAllPersons();
    }



    async personVerifier(personId:number) {
        const person = await this.personRepository.findPersonById(personId);
        if (!person)
            throw new Error("this person don't exist");
        if(await this.userRepository.findUser(personId) != null) 
            throw new Error("this person already have an user");   
    }

    async dtoToUser(dto:UserDTO) {
        const user = new User(dto.personId, dto.password);
        return user;
    }
}
