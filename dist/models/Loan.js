"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
class Loan {
    constructor(id, bookId, userId, loanDate, returnDate) {
        this._id = id;
        this._bookId = bookId;
        this._userId = userId;
        this._loanDate = loanDate;
        this._returnDate = returnDate;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get bookId() {
        return this._bookId;
    }
    set bookId(value) {
        this._bookId = value;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get loanDate() {
        return this._loanDate;
    }
    set loanDate(value) {
        this._loanDate = value;
    }
    get returnDate() {
        return this._returnDate;
    }
    set returnDate(value) {
        this._returnDate = value;
    }
}
exports.Loan = Loan;
