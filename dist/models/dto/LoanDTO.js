"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanDTO = void 0;
class LoanDTO {
    constructor(bookId, userId, loanDate, returnDate, id) {
        this.id = id || 0;
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }
}
exports.LoanDTO = LoanDTO;
