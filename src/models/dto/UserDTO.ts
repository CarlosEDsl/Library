export class UserDTO{
    id:number;
    personId: number;
    password: string;

    constructor(id?:number, personId?:number, password?:string) {
        this.id = id || 0;
        this.personId = personId || 0;
        this.password = password || '';
    }
}