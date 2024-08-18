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
        loan.id = loanDTO.id;
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
        loan.id = loanDTO.id;
        const loanRemove = await this.loanRepository.findLoan(loan.id);
        if(!loanRemove)
            throw new Error("this loan don't exist");
        if(loanRemove.bookId != loan.bookId || loanRemove.loanDate.getTime() != loan.loanDate.getTime()
            || loanRemove.returnDate.getTime() != loan.returnDate.getTime() 
            || loanRemove.userId != loan.userId)
            throw new Error("data to remove don't match with id: " + loan.id);
        return await this.loanRepository.deleteLoan(loan.id);
    }

    async findLoan(id:number) {
        const loan = await this.loanRepository.findLoan(id);
        if(!loan)
            throw new Error("not found");
        return loan;
    }

    async getAllFromBook(bookId:number) {
        const loans = await this.loanRepository.findLoanByBookId(bookId);
        if(loans.length <= 0) {
            throw new Error("don't have loans with this book");
        }
        try{
            this.bookVerifier(bookId);
        } catch(err){
            throw err;
        }
        return loans;
    }

    async getAllFromUser(userId:number) {
        const loans = await this.loanRepository.findLoanByUserId(userId);
        if(loans.length <= 0 )
            throw new Error("this user don't have loans");
        try{
            await this.userVerifier(userId);
        } catch(err) {
            throw err;
        }
        return loans;
    }

    async getAllLoan() {
        return await this.loanRepository.findAllLoans();
    }

    async dateVerifier(loan:Loan){
        if(loan.loanDate.getTime() > loan.returnDate.getTime()){
            throw new Error("You can't make the returnDate before the loanDate")
        }
        const loans = await this.loanRepository.findLoanByBookId(loan.bookId);
        const alreadyInUse = loans.some(l => loan.loanDate.getTime() < l.returnDate.getTime());

        if(alreadyInUse)
            throw new Error("this book is already in use in this loanDate");
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