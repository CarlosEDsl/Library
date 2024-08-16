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
exports.CategoryController = void 0;
const tsoa_1 = require("tsoa");
const CategoryDTO_1 = require("../models/dto/CategoryDTO");
const CategoryService_1 = require("../services/CategoryService");
const BasicResponseDTO_1 = require("../models/dto/BasicResponseDTO");
let CategoryController = class CategoryController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.categoryService = new CategoryService_1.CategoryService();
    }
    createCategory(category, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = yield this.categoryService.registerCategory(category);
                return success(201, new BasicResponseDTO_1.BasicResponseDto("Successful created", newCategory));
            }
            catch (err) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto(err.message, undefined));
            }
        });
    }
    updateCategory(category, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield this.categoryService.editCategory(category);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfull updated", updatedCategory));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Failed to update " + err, undefined));
            }
        });
    }
    deleteCategory(category, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.categoryService.deleteCategory(category);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfull deleted", null));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("error on delete" + err, undefined));
            }
        });
    }
    findCategory(id, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryService.findCategory(id);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfull found", category));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("error on search " + err, undefined));
            }
        });
    }
    findAllCategories(success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryService.getAllCategories();
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfull found", category));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("error on search " + err, undefined));
            }
        });
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryDTO_1.CategoryDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryDTO_1.CategoryDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryDTO_1.CategoryDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findCategory", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllCategories", null);
exports.CategoryController = CategoryController = __decorate([
    (0, tsoa_1.Route)("category"),
    (0, tsoa_1.Tags)("Category")
], CategoryController);
