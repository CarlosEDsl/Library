import { Person } from './../models/Person';
import { executarComandoSQL } from "../databases/mysql";

export class PersonRepository {

    public static instance: PersonRepository;

    public static getInstance() {
        if(!PersonRepository.instance) {
            PersonRepository.instance = new PersonRepository();
        }
        return PersonRepository.instance;
    }

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS Library.person (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE
        )`;
        try {
            const result = await executarComandoSQL(query, []);
            console.log("Table Person created successfully", result);
        } catch (err) {
            console.error(err);
        }
    }

    async insertPerson(person: Person): Promise<Person> {
        const query = 'INSERT INTO Library.person (name, email) VALUES (?, ?)';
        try {
            const result = await executarComandoSQL(query, [person.name, person.email]);
            person.id = result.insertId;
            return person;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updatePerson(person: Person): Promise<Person> {
        const query = 'UPDATE Library.person SET name = ?, email = ? WHERE id = ?';
        try {
            await executarComandoSQL(query, [person.name, person.email, person.id]);
            return person;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async deletePerson(id: number): Promise<void> {
        const query = 'DELETE FROM Library.person WHERE id = ?';
        try {
            await executarComandoSQL(query, [id]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findPersonById(id: number): Promise<Person> {
        const query = 'SELECT * FROM Library.person WHERE id = ?';
        try {
            const result = await executarComandoSQL(query, [id]);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findPersonByEmail(email:string): Promise<Person> {
        const query = 'SELECT * FROM Library.person WHERE email = ?';
        try {
            const result = await executarComandoSQL(query, [email]);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findAllPersons(): Promise<Person[]> {
        const query = 'SELECT * FROM Library.person';
        try {
            const result = await executarComandoSQL(query, []);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
