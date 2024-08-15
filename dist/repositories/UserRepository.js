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
exports.UserRepository = void 0;
const mysql_1 = require("../databases/mysql");
class UserRepository {
    static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS Library.user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            personId INT NOT NULL,
            password VARCHAR(255) NOT NULL,
            FOREIGN KEY (personId) REFERENCES Library.person(id)
        )`;
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Table User created successfully", result);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    insertUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Library.user (personId, password) VALUES (?, ?)';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [user.personId, user.password]);
                user.id = result.insertId;
                return user;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE Library.user SET personId = ?, password = ? WHERE id = ?';
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [user.personId, user.password, user.id]);
                return user;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM Library.user WHERE id = ?';
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [id]);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.user WHERE id = ?';
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
    findUserByPersonId(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.user WHERE personId = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [personId]);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.user';
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
exports.UserRepository = UserRepository;
