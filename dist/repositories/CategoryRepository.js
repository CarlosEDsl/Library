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
exports.CategoryRepository = void 0;
const mysql_1 = require("../databases/mysql");
class CategoryRepository {
    static getInstance() {
        if (!CategoryRepository.instance) {
            CategoryRepository.instance = new CategoryRepository();
        }
        return CategoryRepository.instance;
    }
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS Library.category (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL
            )`;
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Table successful created", result);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    insertCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Library.category(id, name) values(?, ?)';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [category.id, category.name]);
                category.id = result.insertId;
                return new Promise((resolve) => {
                    resolve(category);
                });
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    updateCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE Library.category set name = ? where id = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [category.name, category.id]);
                return new Promise((resolve) => {
                    resolve(category);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM Library.category where id = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [category.id]);
            }
            catch (err) {
                throw err;
            }
        });
    }
    findCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.category where id = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                return new Promise((resolve) => {
                    resolve(result[0]);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.category where name = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [name]);
                return new Promise((resolve) => {
                    resolve(result[0]);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.category';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(result);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.CategoryRepository = CategoryRepository;
