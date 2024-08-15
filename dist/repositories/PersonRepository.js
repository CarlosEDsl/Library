"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonRepository = void 0;
const mysql_1 = require("../databases/mysql");
class PersonRepository {
    static getInstance() {
        if (!PersonRepository.instance) {
            PersonRepository.instance = new PersonRepository();
        }
        return PersonRepository.instance;
    }
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS Library.person (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE
        )`;
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Table Person created successfully", result);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    insertPerson(person) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Library.person (name, email) VALUES (?, ?)';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [person.name, person.email]);
                person.id = result.insertId;
                return person;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    updatePerson(person) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE Library.person SET name = ?, email = ? WHERE id = ?';
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [person.name, person.email, person.id]);
                return person;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    deletePerson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM Library.person WHERE id = ?';
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [id]);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findPersonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.person WHERE id = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findPersonByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.person WHERE email = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [email]);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findAllPersons() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.person';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.PersonRepository = PersonRepository;
