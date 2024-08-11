export class LoanDTO {

    bookId:number;
    userId:number;
    loanDate:Date;
    returnDate:Date;

    constructor(bookId:number, userId:number, loanDate:Date, returnDate:Date) {
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }
}