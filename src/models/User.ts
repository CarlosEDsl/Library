export class User {
    private _id: number;
    private _personId: number;
    private _password: string;
  
    constructor(id: number, personId: number, password: string) {
      this._id = id;
      this._personId = personId;
      this._password = password;
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
  
    get personId(): number {
      return this._personId;
    }
  
    set personId(value: number) {
      this._personId = value;
    }
  
    get password(): string {
      return this._password;
    }
  
    set password(value: string) {
      this._password = value;
    }
  }
  