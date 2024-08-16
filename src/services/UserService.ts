import { UserDTO } from "../models/dto/UserDTO";
import { User } from "../models/User";
import { LoanRepository } from "../repositories/LoanRepository";
import { PersonRepository } from "../repositories/PersonRepository";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {

    userRepository:UserRepository = UserRepository.getInstance();
    personRepository:PersonRepository = PersonRepository.getInstance();
    loanRepository:LoanRepository = LoanRepository.getInstance();

    async registerUser(userDTO:UserDTO) {
        const user = this.dtoToUser(userDTO);
        try{
            await this.personVerifier(user.personId);
        } catch(err) {
            throw err;
        }

        return await this.userRepository.insertUser(user);        
    }

    async editUser(userDTO:UserDTO) {
        const user = this.dtoToUser(userDTO);
        user.id = userDTO.id?? 0;
        try{
            if((await this.userRepository.findUser(user.id)).personId != user.personId)
                await this.personVerifier(user.personId);
        } catch(err) {
            throw err;
        }
        return await this.userRepository.updateUser(user);
    }

    async deleteUser(userDTO:UserDTO) {
        const user = this.dtoToUser(userDTO);
        user.id = userDTO.id?? 0;
        const deletePerson = await this.userRepository.findUser(user.id);
        if(deletePerson.personId != user.personId || deletePerson.password != user.password) {
            throw new Error("data don't match");
        }
        return await this.userRepository.deleteUser(user.id);
    }

    async findUser(id:number) {
        const user = await this.userRepository.findUser(id);
        if(!user)
            throw new Error("not found");
        return user;
    }

    async findUserByPersonId(id:number) {
        const user = await this.userRepository.findUserByPersonId(id);
        return user;
    }

    async getAllUser() {
        return await this.userRepository.findAllUsers();
    }



    async personVerifier(personId:number) {
        const person = await this.personRepository.findPersonById(personId);
        if (!person)
            throw new Error("this person don't exist");
        if(await this.userRepository.findUserByPersonId(personId) != null)
            throw new Error("this person already have an user");   
    }

    async referencesVerification(userId:number) {
        const loans = await this.loanRepository.findLoanByUserId(userId);
        if(loans.length > 0 )
            throw new Error("There is books with this category yet, update then before delete this category");
    }

    dtoToUser(dto:UserDTO) {
        const user = new User(dto.personId, dto.password);
        return user;
    }
}
