"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanDTO = void 0;
class LoanDTO {
    constructor(bookId, userId, loanDate, returnDate) {
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }
}
exports.LoanDTO = LoanDTO;
