import { Book } from './../models/Book';
import { executarComandoSQL } from "../databases/mysql";

export class BookRepository {

    private static instance:BookRepository;
    public static getInstance() {
        if(!BookRepository.instance) {
            BookRepository.instance = new BookRepository();
        }
        return BookRepository.instance;
    }

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS Library.book (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(100) NOT NULL,
            categoryId INT,
            FOREIGN KEY (categoryId) REFERENCES Library.category(id)
        )`;
        try {
            const result = await executarComandoSQL(query, []);
            console.log("Table Book created successfully", result);
        } catch (err) {
            console.error(err);
        }
    }

    async insertBook(book: Book): Promise<Book> {
        const query = 'INSERT INTO Library.book (title, author, categoryId) VALUES (?, ?, ?)';
        try {
            const result = await executarComandoSQL(query, [book.title, book.author, book.categoryId]);
            book.id = result.insertId;
            return book;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async updateBook(book: Book): Promise<Book> {
        const query = 'UPDATE Library.book SET title = ?, author = ?, categoryId = ? WHERE id = ?';
        try {
            await executarComandoSQL(query, [book.title, book.author, book.categoryId, book.id]);
            return book;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async deleteBook(id: number): Promise<void> {
        const query = 'DELETE FROM Library.book WHERE id = ?';
        try {
            await executarComandoSQL(query, [id]);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findBookById(id: number): Promise<Book> {
        const query = 'SELECT * FROM Library.book WHERE id = ?';
        try {
            const result = await executarComandoSQL(query, [id]);
            return result[0];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findBookByAuthorAndName(author:string, title:string)  {
        const query = 'SELECT * FROM Library.book WHERE author=? AND title=?';
        try {
            const result = await executarComandoSQL(query, [author, title]);
            return result[0];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findAllBooks(): Promise<Book[]> {
        const query = 'SELECT * FROM Library.book';
        try {
            const result = await executarComandoSQL(query, []);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
