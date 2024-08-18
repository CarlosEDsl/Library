"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanService = void 0;
const UserRepository_1 = require("./../repositories/UserRepository");
const BookRepository_1 = require("./../repositories/BookRepository");
const Loan_1 = require("../models/Loan");
const LoanRepository_1 = require("../repositories/LoanRepository");
class LoanService {
    constructor() {
        this.loanRepository = LoanRepository_1.LoanRepository.getInstance();
        this.bookRepository = BookRepository_1.BookRepository.getInstance();
        this.UserRepository = UserRepository_1.UserRepository.getInstance();
    }
    registerLoan(loanDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const loan = this.dtoToLoan(loanDTO);
            try {
                yield this.bookVerifier(loan.bookId);
                yield this.userVerifier(loan.userId);
                yield this.dateVerifier(loan);
            }
            catch (err) {
                throw err;
            }
            return yield this.loanRepository.insertLoan(loan);
        });
    }
    editLoan(loanDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const loan = this.dtoToLoan(loanDTO);
            loan.id = loanDTO.id;
            if (!(yield this.loanRepository.findLoan(loan.id)))
                throw new Error("this loan don't exist");
            try {
                yield this.bookVerifier(loan.bookId);
                yield this.userVerifier(loan.userId);
                yield this.dateVerifier(loan);
            }
            catch (err) {
                throw err;
            }
            return yield this.loanRepository.updateLoan(loan);
        });
    }
    deleteLoan(loanDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const loan = this.dtoToLoan(loanDTO);
            loan.id = loanDTO.id;
            const loanRemove = yield this.loanRepository.findLoan(loan.id);
            if (!loanRemove)
                throw new Error("this loan don't exist");
            if (loanRemove.bookId != loan.bookId || loanRemove.loanDate.getTime() != loan.loanDate.getTime()
                || loanRemove.returnDate.getTime() != loan.returnDate.getTime()
                || loanRemove.userId != loan.userId)
                throw new Error("data to remove don't match with id: " + loan.id);
            return yield this.loanRepository.deleteLoan(loan.id);
        });
    }
    findLoan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const loan = yield this.loanRepository.findLoan(id);
            if (!loan)
                throw new Error("not found");
            return loan;
        });
    }
    getAllFromBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const loans = yield this.loanRepository.findLoanByBookId(bookId);
            if (loans.length <= 0) {
                throw new Error("don't have loans with this book");
            }
            try {
                this.bookVerifier(bookId);
            }
            catch (err) {
                throw err;
            }
            return loans;
        });
    }
    getAllFromUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const loans = yield this.loanRepository.findLoanByUserId(userId);
            if (loans.length <= 0)
                throw new Error("this user don't have loans");
            try {
                yield this.userVerifier(userId);
            }
            catch (err) {
                throw err;
            }
            return loans;
        });
    }
    getAllLoan() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.loanRepository.findAllLoans();
        });
    }
    dateVerifier(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            if (loan.loanDate.getTime() > loan.returnDate.getTime()) {
                throw new Error("You can't make the returnDate before the loanDate");
            }
            const loans = yield this.loanRepository.findLoanByBookId(loan.bookId);
            const alreadyInUse = loans.some(l => loan.loanDate.getTime() < l.returnDate.getTime());
            if (alreadyInUse)
                throw new Error("this book is already in use in this loanDate");
        });
    }
    userVerifier(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const loan = yield this.UserRepository.findUser(userId);
            if (!loan)
                throw new Error("this user don't exist");
        });
    }
    bookVerifier(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.bookRepository.findBookById(bookId))) {
                throw new Error("this book don't exist");
            }
        });
    }
    dtoToLoan(dto) {
        return new Loan_1.Loan(dto.bookId, dto.userId, dto.loanDate, dto.returnDate);
    }
}
exports.LoanService = LoanService;
