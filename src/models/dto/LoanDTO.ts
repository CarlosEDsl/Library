export class LoanDTO {
    id:number;
    bookId:number;
    userId:number;
    loanDate:Date;
    returnDate:Date;

    constructor(bookId:number, userId:number, loanDate:Date, returnDate:Date, id?:number) {
        this.id = id || 0;
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }
}