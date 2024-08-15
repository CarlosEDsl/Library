import { CategoryRepository } from './../repositories/CategoryRepository';
import { Book } from "../models/Book";
import { BookDTO } from "../models/dto/BookDTO";
import { BookRepository } from "../repositories/BookRepository";
import { isEqual } from '../utils.ts/objectsUtils';

export class BookService {
    bookRepository = BookRepository.getInstance();
    categoryRepository = CategoryRepository.getInstance();

    async registerBook(bookDTO:BookDTO) {
        const book = this.dtoToBook(bookDTO);
        try{
            await this.verifyCategory(book.categoryId);
            await this.verifyUniqueness(book);
        } catch(err) {
            throw err;
        }
        return await this.bookRepository.insertBook(book);
    }

    async editBook(bookDTO:BookDTO) {
        const book = this.dtoToBook(bookDTO);
        try{
            const oldBook = await this.bookRepository.findBookById(book.id);
            if(!oldBook)
                throw new Error("this book don't exist");
            this.verifyCategory(book.categoryId);
            if(oldBook.title != book.title && oldBook.author != book.author)
                await this.verifyUniqueness(book);
        } catch (err) {
            throw err;
        }

        if(! await this.bookRepository.findBookById(book.id))
            throw new Error(`id: ${book.id} don't exist in books`)

        return await this.bookRepository.updateBook(book);
    }

    async deleteBook(bookDTO:BookDTO) {
        const book = this.dtoToBook(bookDTO);
        const deleteBookId = await this.bookRepository.findBookById(book.id);
        const deleteBookName = await this.bookRepository.findBookByAuthorAndName(book.author, book.title);

        console.log(deleteBookId, deleteBookName);

        if(!isEqual(deleteBookId, deleteBookName))
            throw new Error("Book and BookId don't match");
        return await this.bookRepository.deleteBook(book.id);
    }

    async findBook(id:number) {
        const book = await this.bookRepository.findBookById(id);
        return book;
    }

    async getAllBook(){
        return await this.bookRepository.findAllBooks();
    }



    //Verifications

    async verifyCategory(categoryId:number) {
        const category = await this.categoryRepository.findCategoryById(categoryId);
        if(!category) 
            throw new Error("this category don't exist");
    }

    async verifyUniqueness(book:Book) {
        const bookVerify = await this.bookRepository.findBookByAuthorAndName(book.author, book.title);
        if(bookVerify)
            throw new Error("this book is already registered");
    }

    dtoToBook(dto:BookDTO) {
        const book = new Book(dto.title, dto.author, dto.category_id, dto.id);
        return book;
    }
}