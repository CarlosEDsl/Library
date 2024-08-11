export class Person {
    private _id: number;
    private _name: string;
    private _email: string;
  
    constructor(id: number, name: string, email: string) {
      this._id = id;
      this._name = name;
      this._email = email;
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
  
    get email(): string {
      return this._email;
    }
  
    set email(value: string) {
      this._email = value;
    }
  }
  