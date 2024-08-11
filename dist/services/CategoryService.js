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
class CategoryService {
    constructor() {
        this.categoryRepository = CategoryRepository_1.CategoryRepository.getInstance();
    }
    registerCategory(categoryDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.dtoToCategory(categoryDTO);
            this.nameVerification(category.name);
            const newCategory = yield this.categoryRepository.insertCategory(category);
            return newCategory;
        });
    }
    editCategory(categoryDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.dtoToCategory(categoryDTO);
            this.nameVerification(category.name);
            const editedCategory = yield this.categoryRepository.updateCategory(category);
            return editedCategory;
        });
    }
    deleteCategory(categoryDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.dtoToCategory(categoryDTO);
            const removedCategory = yield this.categoryRepository.deleteCategory(category);
            return removedCategory;
        });
    }
    findCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findCategoryById(id);
            return category;
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.categoryRepository.findAllCategories();
        });
    }
    nameVerification(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.categoryRepository.findCategoryByName(name)) != null)
                throw new Error("this category already exist");
        });
    }
    dtoToCategory(dto) {
        return new Category_1.Category(undefined, dto.name);
    }
}
exports.CategoryService = CategoryService;
