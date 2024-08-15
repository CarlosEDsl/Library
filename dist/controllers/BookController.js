"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.BookController = void 0;
const tsoa_1 = require("tsoa");
const BookDTO_1 = require("../models/dto/BookDTO");
const BookService_1 = require("../services/BookService");
const BasicResponseDTO_1 = require("../models/dto/BasicResponseDTO");
let BookController = class BookController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.bookService = new BookService_1.BookService();
    }
    createBook(book, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = yield this.bookService.registerBook(book);
                return success(201, new BasicResponseDTO_1.BasicResponseDto("Successfully created", newBook));
            }
            catch (err) {
                console.error("Error in createBook:", err.message);
                return fail(400, new BasicResponseDTO_1.BasicResponseDto(err.message, undefined));
            }
        });
    }
    updateBook(book, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBook = yield this.bookService.editBook(book);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully updated", updatedBook));
            }
            catch (err) {
                console.error("Error in updateBook:", err);
                return fail(404, new BasicResponseDTO_1.BasicResponseDto(err.message, undefined));
            }
        });
    }
    deleteBook(book, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.bookService.deleteBook(book);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully deleted", undefined));
            }
            catch (err) {
                console.error("Error in deleteBook:", err);
                return fail(404, new BasicResponseDTO_1.BasicResponseDto(err.message, undefined));
            }
        });
    }
    findBook(id, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.bookService.findBook(id);
                if (!book) {
                    return fail(404, new BasicResponseDTO_1.BasicResponseDto("Book not found", undefined));
                }
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully found", book));
            }
            catch (err) {
                console.error("Error in findBook:", err);
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on search", err.message));
            }
        });
    }
    findAllBooks(success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookService.getAllBook();
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully found", books));
            }
            catch (err) {
                console.error("Error in findAllBooks:", err);
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on search", err.message));
            }
        });
    }
};
exports.BookController = BookController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookDTO_1.BookDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "createBook", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookDTO_1.BookDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookDTO_1.BookDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findBook", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findAllBooks", null);
exports.BookController = BookController = __decorate([
    (0, tsoa_1.Route)("book"),
    (0, tsoa_1.Tags)("Book")
], BookController);
