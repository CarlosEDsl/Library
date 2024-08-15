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
exports.BookService = void 0;
const CategoryRepository_1 = require("./../repositories/CategoryRepository");
const Book_1 = require("../models/Book");
const BookRepository_1 = require("../repositories/BookRepository");
const objectsUtils_1 = require("../utils.ts/objectsUtils");
class BookService {
    constructor() {
        this.bookRepository = BookRepository_1.BookRepository.getInstance();
        this.categoryRepository = CategoryRepository_1.CategoryRepository.getInstance();
    }
    registerBook(bookDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = this.dtoToBook(bookDTO);
            try {
                yield this.verifyCategory(book.categoryId);
                yield this.verifyUniqueness(book);
            }
            catch (err) {
                throw err;
            }
            return yield this.bookRepository.insertBook(book);
        });
    }
    editBook(bookDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = this.dtoToBook(bookDTO);
            try {
                const oldBook = yield this.bookRepository.findBookById(book.id);
                if (!oldBook)
                    throw new Error("this book don't exist");
                this.verifyCategory(book.categoryId);
                if (oldBook.title != book.title && oldBook.author != book.author)
                    yield this.verifyUniqueness(book);
            }
            catch (err) {
                throw err;
            }
            if (!(yield this.bookRepository.findBookById(book.id)))
                throw new Error(`id: ${book.id} don't exist in books`);
            return yield this.bookRepository.updateBook(book);
        });
    }
    deleteBook(bookDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = this.dtoToBook(bookDTO);
            const deleteBookId = yield this.bookRepository.findBookById(book.id);
            const deleteBookName = yield this.bookRepository.findBookByAuthorAndName(book.author, book.title);
            console.log(deleteBookId, deleteBookName);
            if (!(0, objectsUtils_1.isEqual)(deleteBookId, deleteBookName))
                throw new Error("Book and BookId don't match");
            return yield this.bookRepository.deleteBook(book.id);
        });
    }
    findBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookRepository.findBookById(id);
            return book;
        });
    }
    getAllBook() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepository.findAllBooks();
        });
    }
    //Verifications
    verifyCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findCategoryById(categoryId);
            if (!category)
                throw new Error("this category don't exist");
        });
    }
    verifyUniqueness(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookVerify = yield this.bookRepository.findBookByAuthorAndName(book.author, book.title);
            if (bookVerify)
                throw new Error("this book is already registered");
        });
    }
    dtoToBook(dto) {
        const book = new Book_1.Book(dto.title, dto.author, dto.category_id, dto.id);
        return book;
    }
}
exports.BookService = BookService;
