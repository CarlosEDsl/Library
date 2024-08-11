export class Loan {
    private _id: number;
    private _bookId: number;
    private _userId: number;
    private _loanDate: Date;
    private _returnDate: Date;
  
    constructor(id: number, bookId: number, userId: number, loanDate: Date, returnDate: Date) {
      this._id = id;
      this._bookId = bookId;
      this._userId = userId;
      this._loanDate = loanDate;
      this._returnDate = returnDate;
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
  
    get bookId(): number {
      return this._bookId;
    }
  
    set bookId(value: number) {
      this._bookId = value;
    }
  
    get userId(): number {
      return this._userId;
    }
  
    set userId(value: number) {
      this._userId = value;
    }
  
    get loanDate(): Date {
      return this._loanDate;
    }
  
    set loanDate(value: Date) {
      this._loanDate = value;
    }
  
    get returnDate(): Date {
      return this._returnDate;
    }
  
    set returnDate(value: Date) {
      this._returnDate = value;
    }
  }
  