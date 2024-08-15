import { Loan } from './../models/Loan';
import { executarComandoSQL } from "../databases/mysql";

export class LoanRepository {

    private static instance:LoanRepository;
    public static getInstance() {
        if(!LoanRepository.instance){
            LoanRepository.instance = new LoanRepository();
        }
        return LoanRepository.instance;
    }

    constructor() {
        this.createTable();
    }

    private async createTable() {
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
            const result = await executarComandoSQL(query, []);
            console.log("Table Loan created successfully", result);
        } catch (err) {
            console.error(err);
        }
    }

    async insertLoan(loan: Loan): Promise<Loan> {
        const query = 'INSERT INTO Library.loan (bookId, userId, loanDate, returnDate) VALUES (?, ?, ?, ?)';
        try {
            const result = await executarComandoSQL(query, [loan.bookId, loan.userId, loan.loanDate, loan.returnDate]);
            loan.id = result.insertId;
            return loan;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateLoan(loan: Loan): Promise<Loan> {
        const query = 'UPDATE Library.loan SET bookId = ?, userId = ?, loanDate = ?, returnDate = ? WHERE id = ?';
        try {
            await executarComandoSQL(query, [loan.bookId, loan.userId, loan.loanDate, loan.returnDate, loan.id]);
            return loan;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async deleteLoan(id: number): Promise<void> {
        const query = 'DELETE FROM Library.loan WHERE id = ?';
        try {
            await executarComandoSQL(query, [id]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findLoan(id: number): Promise<Loan> {
        const query = 'SELECT * FROM Library.loan WHERE id = ?';
        try {
            const result = await executarComandoSQL(query, [id]);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findLoanByBookId(bookId: number): Promise<Loan[]> {
        const query = 'SELECT * FROM Library.loan WHERE bookId = ?';
        try {
            const result = await executarComandoSQL(query, [bookId]);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findLoanByUserId(userId: number): Promise<Loan[]> {
        const query = 'SELECT * FROM Library.loan WHERE userId = ?';
        try {
            const result = await executarComandoSQL(query, [userId]);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findAllLoans(): Promise<Loan[]> {
        const query = 'SELECT * FROM Library.loan';
        try {
            const result = await executarComandoSQL(query, []);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
