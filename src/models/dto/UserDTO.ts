export class UserDTO{
    personId: number;
    password: string;

    constructor(personId?:number, password?:string) {
        this.personId = personId || 0;
        this.password = password || '';
    }
}