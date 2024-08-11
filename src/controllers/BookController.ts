import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BookDTO } from "../models/dto/BookDTO";
import { BookService } from "../services/BookService";
import { BasicResponseDto } from "../models/dto/BasicResponseDTO";
import { Book } from "../models/Book";

@Route("book")
@Tags("Book")
export class BookController extends Controller {
    bookService = new BookService();

    @Post()
    async createBook(
        @Body() book: BookDTO,
        @Res() success: TsoaResponse<201, BasicResponseDto>,
        @Res() fail: TsoaResponse<400, BasicResponseDto>
    ): Promise<void> {
        try {
            const newBook = await this.bookService.registerBook(book);
            return success(201, new BasicResponseDto("Successfully created", newBook));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put()
    async updateBook(
        @Body() book: Book,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const updatedBook = await this.bookService.editBook(book);
            return success(200, new BasicResponseDto("Successfully updated", updatedBook));
        } catch (err) {
            return fail(404, new BasicResponseDto("Failed to update", undefined));
        }
    }

    @Delete()
    async deleteBook(
        @Body() book: Book,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const deletedBook = await this.bookService.deleteBook(book.id);
            return success(200, new BasicResponseDto("Successfully deleted", deletedBook));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on delete", err));
        }
    }

    @Get("id/{id}")
    async findBook(
        @Path() id: number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const book = await this.bookService.findBook(id);
            return success(200, new BasicResponseDto("Successfully found", book));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search", err));
        }
    }

    @Get("all")
    async findAllBooks(
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const books = await this.bookService.getAllBooks();
            return success(200, new BasicResponseDto("Successfully found", books));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search", err));
        }
    }
}
