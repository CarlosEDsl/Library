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
exports.LoanRepository = void 0;
const mysql_1 = require("../databases/mysql");
class LoanRepository {
    static getInstance() {
        if (!LoanRepository.instance) {
            LoanRepository.instance = new LoanRepository();
        }
        return LoanRepository.instance;
    }
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS Library.loan (
            id INT AUTO_INCREMENT PRIMARY KEY,
            bookId INT NOT NULL,
            userId INT NOT NULL,
            loanDate DATE NOT NULL,
            returnDate DATE NOT NULL,
            FOREIGN KEY (bookId) REFERENCES Library.book(id),
            FOREIGN KEY (userId) REFERENCES Library.user(id)
        )`;
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Table Loan created successfully", result);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    insertLoan(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Library.loan (bookId, userId, loanDate, returnDate) VALUES (?, ?, ?, ?)';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [loan.bookId, loan.userId, loan.loanDate, loan.returnDate]);
                loan.id = result.insertId;
                return loan;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    updateLoan(loan) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE Library.loan SET bookId = ?, userId = ?, loanDate = ?, returnDate = ? WHERE id = ?';
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [loan.bookId, loan.userId, loan.loanDate, loan.returnDate, loan.id]);
                return loan;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    deleteLoan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM Library.loan WHERE id = ?';
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [id]);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findLoan(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.loan WHERE id = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findLoanByBookId(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.loan WHERE bookId = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [bookId]);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findLoanByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.loan WHERE userId = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [userId]);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findAllLoans() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.loan';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.LoanRepository = LoanRepository;
