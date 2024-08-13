import { User } from './../models/User';
import { executarComandoSQL } from "../databases/mysql";

export class UserRepository {

    public static instance:UserRepository;
    public static getInstance() {
        if(!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS Library.user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            personId INT NOT NULL,
            password VARCHAR(255) NOT NULL,
            FOREIGN KEY (personId) REFERENCES Library.person(id)
        )`;
        try {
            const result = await executarComandoSQL(query, []);
            console.log("Table User created successfully", result);
        } catch (err) {
            console.error(err);
        }
    }

    async insertUser(user: User): Promise<User> {
        const query = 'INSERT INTO Library.user (personId, password) VALUES (?, ?)';
        try {
            const result = await executarComandoSQL(query, [user.personId, user.password]);
            user.id = result.insertId;
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateUser(user: User): Promise<User> {
        const query = 'UPDATE Library.user SET personId = ?, password = ? WHERE id = ?';
        try {
            await executarComandoSQL(query, [user.personId, user.password, user.id]);
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async deleteUser(id: number): Promise<void> {
        const query = 'DELETE FROM Library.user WHERE id = ?';
        try {
            await executarComandoSQL(query, [id]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findUser(id: number): Promise<User> {
        const query = 'SELECT * FROM Library.user WHERE id = ?';
        try {
            const result = await executarComandoSQL(query, [id]);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findUserByPersonId(personId:number):Promise<User> {
        const query = 'SELECT * FROM Library.user WHERE personId = ?';
        try {
            const result = await executarComandoSQL(query, [personId]);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findAllUsers(): Promise<User[]> {
        const query = 'SELECT * FROM Library.user';
        try {
            const result = await executarComandoSQL(query, []);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
