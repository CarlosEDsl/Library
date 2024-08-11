"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookDTO = void 0;
class BookDTO {
    constructor(title, author, category_id) {
        this.title = title || '';
        this.author = author || '';
        this.category_id = category_id || 0;
    }
}
exports.BookDTO = BookDTO;
