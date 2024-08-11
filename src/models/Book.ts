export class Book {
    private _id: number;
    private _title: string;
    private _author: string;
    private _categoryId: number;
  
    constructor(id: number, title: string, author: string, categoryId: number) {
      this._id = id;
      this._title = title;
      this._author = author;
      this._categoryId = categoryId;
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
  
    get title(): string {
      return this._title;
    }
  
    set title(value: string) {
      this._title = value;
    }
  
    get author(): string {
      return this._author;
    }
  
    set author(value: string) {
      this._author = value;
    }
  
    get categoryId(): number {
      return this._categoryId;
    }
  
    set categoryId(value: number) {
      this._categoryId = value;
    }
  }
  