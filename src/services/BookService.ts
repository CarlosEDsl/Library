import { CategoryRepository } from './../repositories/CategoryRepository';
import { Book } from "../models/Book";
import { BookDTO } from "../models/dto/BookDTO";
import { BookRepository } from "../repositories/BookRepository";
import { isEqual } from '../utils.ts/objectsUtils';
import { LoanRepository } from '../repositories/LoanRepository';

export class BookService {
    bookRepository = BookRepository.getInstance();
    categoryRepository = CategoryRepository.getInstance();
    loanRepository = LoanRepository.getInstance();

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
        book.id = bookDTO.id?? 0;
        const deleteBookId = await this.bookRepository.findBookById(book.id);
        const deleteBookName = await this.bookRepository.findBookByAuthorAndName(book.author, book.title);

        if(!deleteBookId)
            throw new Error("This book don't exist");

        if(!isEqual(deleteBookId, deleteBookName))
            throw new Error("Book and BookId don't match");
        try{
            await this.referencesVerification(book.id);
        }catch (err) {
            throw err;
        }

        return await this.bookRepository.deleteBook(book.id);
    }

    async findBook(id:number) {
        const book = await this.bookRepository.findBookById(id);
        if(!book)
            throw new Error("not found");
        return book;
    }

    async getAllBook(){
        return await this.bookRepository.findAllBooks();
    }

    async getBooksByCategory(categoryId:number) {
        return await this.bookRepository.findAllBooksByCategory(categoryId);
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
    
    async referencesVerification(bookId:number) {
        const loans = await this.loanRepository.findLoanByBookId(bookId);
        if(loans.length > 0 )
            throw new Error("this book still in some loans, please delete or update this loans to delete this book");
    }


    dtoToBook(dto:BookDTO) {
        const book = new Book(dto.title, dto.author, dto.category_id, dto.id);
        return book;
    }
}