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
exports.BookRepository = void 0;
const mysql_1 = require("../databases/mysql");
class BookRepository {
    static getInstance() {
        if (!BookRepository.instance) {
            BookRepository.instance = new BookRepository();
        }
        return BookRepository.instance;
    }
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS Library.book (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(100) NOT NULL,
            categoryId INT,
            FOREIGN KEY (categoryId) REFERENCES Library.category(id)
        )`;
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Table Book created successfully", result);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    insertBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO Library.book (title, author, categoryId) VALUES (?, ?, ?)';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [book.title, book.author, book.categoryId]);
                book.id = result.insertId;
                return book;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    updateBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE Library.book SET title = ?, author = ?, categoryId = ? WHERE id = ?';
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [book.title, book.author, book.categoryId, book.id]);
                return book;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM Library.book WHERE id = ?';
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [id]);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.book WHERE id = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                return result[0];
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findBookByAuthorAndName(author, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.book WHERE author=? AND title=?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [author, title]);
                return result[0];
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    findAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.book';
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
    findAllBooksByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM Library.book WHERE categoryId = ?';
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [categoryId]);
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
}
exports.BookRepository = BookRepository;
