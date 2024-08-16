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
exports.CategoryService = void 0;
const Category_1 = require("../models/Category");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const BookRepository_1 = require("../repositories/BookRepository");
class CategoryService {
    constructor() {
        this.categoryRepository = CategoryRepository_1.CategoryRepository.getInstance();
        this.bookRepository = BookRepository_1.BookRepository.getInstance();
    }
    registerCategory(categoryDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.dtoToCategory(categoryDTO);
            try {
                yield this.nameVerification(category.name);
            }
            catch (err) {
                throw err;
            }
            const newCategory = yield this.categoryRepository.insertCategory(category);
            return newCategory;
        });
    }
    editCategory(categoryDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const category = this.dtoToCategory(categoryDTO);
            category.id = (_a = categoryDTO.id) !== null && _a !== void 0 ? _a : 0;
            try {
                yield this.nameVerification(category.name);
            }
            catch (err) {
                throw err;
            }
            const editedCategory = yield this.categoryRepository.updateCategory(category);
            return editedCategory;
        });
    }
    deleteCategory(categoryDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const category = this.dtoToCategory(categoryDTO);
            category.id = (_a = categoryDTO.id) !== null && _a !== void 0 ? _a : 0;
            const categoryFoundById = yield this.categoryRepository.findCategoryById(category.id);
            if (!(categoryFoundById)) {
                throw new Error("this category don't exist");
            }
            if (categoryFoundById.name != category.name) {
                throw new Error("name and id dont match");
            }
            try {
                yield this.referencesVerification(category);
            }
            catch (err) {
                throw err;
            }
            yield this.categoryRepository.deleteCategory(category);
        });
    }
    findCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findCategoryById(id);
            if (!category)
                throw new Error("not found");
            return category;
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.findAllCategories();
        });
    }
    //Verifications
    nameVerification(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.categoryRepository.findCategoryByName(name)) != null)
                throw new Error("this category already exist");
        });
    }
    referencesVerification(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookRepository.findAllBooksByCategory(category.id);
            if (books.length > 0)
                throw new Error("There is books with this category yet, update then before delete this category");
        });
    }
    dtoToCategory(dto) {
        return new Category_1.Category(undefined, dto.name);
    }
}
exports.CategoryService = CategoryService;
