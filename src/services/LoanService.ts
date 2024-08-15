import { UserRepository } from './../repositories/UserRepository';
import { BookRepository } from './../repositories/BookRepository';
import { LoanDTO } from "../models/dto/LoanDTO";
import { Loan } from "../models/Loan";
import { LoanRepository } from "../repositories/LoanRepository";

export class LoanService {
    loanRepository = LoanRepository.getInstance();
    bookRepository =  BookRepository.getInstance();
    UserRepository = UserRepository.getInstance();

    async registerLoan(loanDTO:LoanDTO) {
        const loan = this.dtoToLoan(loanDTO);
        try{
            await this.bookVerifier(loan.bookId);
            await this.userVerifier(loan.userId);
            await this.dateVerifier(loan)
        } catch(err) {
            throw err;
        }

        return await this.loanRepository.insertLoan(loan);
    }

    async editLoan(loanDTO:LoanDTO) {
        const loan = this.dtoToLoan(loanDTO);
        if(!await this.loanRepository.findLoan(loan.id)) throw new Error("this loan don't exist");
        try {
            await this.bookVerifier(loan.bookId);
            await this.userVerifier(loan.userId);
            await this.dateVerifier(loan)
        } catch (err) {
            throw err;
        }

        return await this.loanRepository.updateLoan(loan);
    }

    async deleteLoan(loanDTO:LoanDTO) {
        const loan = this.dtoToLoan(loanDTO);
        const loanRemove = await this.loanRepository.findLoan(loan.id);
        if(!loanRemove)
            throw new Error("this loan don't exist");
        if(loanRemove.bookId != loan.bookId || loanRemove.loanDate != loan.loanDate || loanRemove.returnDate != loan.returnDate 
            || loanRemove.userId != loan.userId)
            throw new Error("data to remove don't match with id: " + loan.id);
        return await this.loanRepository.deleteLoan(loan.id);
    }

    async findLoan(id:number) {
        const loan = await this.loanRepository.findLoan(id);
        return loan;
    }

    async getAllFromBook(bookId:number) {
        return await this.loanRepository.findLoanByBookId(bookId);
    }

    async getAllFromUser(userId:number) {
        return await this.loanRepository.findLoanByUserId(userId);
    }

    async getAllLoan() {
        return await this.loanRepository.findAllLoans();
    }

    async dateVerifier(loan:Loan){
        if(loan.loanDate.getTime() > loan.returnDate.getTime()){
            throw new Error("You can't make the returnDate before the loanDate")
        }
    }

    async userVerifier(userId:number) {
        const loan = await this.UserRepository.findUser(userId);
        if(!loan) 
            throw new Error("this user don't exist");
    }

    async bookVerifier(bookId:number) {
        if(!await this.bookRepository.findBookById(bookId)) {
            throw new Error("this book don't exist");
        }
        
    }

    dtoToLoan(dto:LoanDTO) {
        return new Loan(dto.bookId, dto.userId, dto.loanDate, dto.returnDate);
    }
}