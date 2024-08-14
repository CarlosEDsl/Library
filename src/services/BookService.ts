import { CategoryRepository } from './../repositories/CategoryRepository';
import { Book } from "../models/Book";
import { BookDTO } from "../models/dto/BookDTO";
import { BookRepository } from "../repositories/BookRepository";

export class BookService {
    bookRepository = BookRepository.getInstance();
    categoryRepository = CategoryRepository.getInstance();

    async registerBook(bookDTO:BookDTO) {
        const book = this.dtoToBook(bookDTO);
        this.verifyCategory(book.categoryId);
        this.verifyUniquess(book);

        return await this.bookRepository.insertBook(book);
    }

    async editBook(book:Book) {
        this.verifyCategory(book.categoryId);
        this.verifyUniquess(book);

        if(! await this.bookRepository.findBookById(book.id))
            throw new Error(`id: ${book.id} don't exist in books`)

        return await this.bookRepository.insertBook(book);
    }

    async deleteBook(book:Book) {
        const deleteBookId = await this.bookRepository.findBookById(book.id);
        const deleteBookName = await this.bookRepository.findBookByAuthorAndName(book.author, book.author);

        if(deleteBookId != deleteBookName)
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

    async verifyUniquess(book:Book) {
        const bookVerify = await this.bookRepository.findBookByAuthorAndName(book.author, book.title);
        if(bookVerify)
            throw new Error("this book is already registered");
    }

    dtoToBook(dto:BookDTO) {
        const book = new Book(dto.title, dto.author, dto.category_id);
        return book;
    }
}