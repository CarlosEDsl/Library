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
exports.LoanController = void 0;
const tsoa_1 = require("tsoa");
const LoanDTO_1 = require("../models/dto/LoanDTO");
const LoanService_1 = require("../services/LoanService");
const BasicResponseDTO_1 = require("../models/dto/BasicResponseDTO");
let LoanController = class LoanController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.loanService = new LoanService_1.LoanService();
    }
    createLoan(loan, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newLoan = yield this.loanService.registerLoan(loan);
                return success(201, new BasicResponseDTO_1.BasicResponseDto("Successfully created", newLoan));
            }
            catch (err) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto(err.message, undefined));
            }
        });
    }
    updateLoan(id, loan, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                loan.id = id;
                const updatedLoan = yield this.loanService.editLoan(loan);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully updated", updatedLoan));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Failed to update", undefined));
            }
        });
    }
    deleteLoan(loan, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loanService.deleteLoan(loan);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully deleted", undefined));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on delete", err));
            }
        });
    }
    findLoan(id, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loan = yield this.loanService.findLoan(id);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully found", loan));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on search", err));
            }
        });
    }
    findAllLoans(success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loans = yield this.loanService.getAllLoan();
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully found", loans));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on search", err));
            }
        });
    }
    findByAllByBook(id, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loans = yield this.loanService.getAllFromBook(id);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("all loans from this book", loans));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("error: ", err));
            }
        });
    }
};
exports.LoanController = LoanController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoanDTO_1.LoanDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "createLoan", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, LoanDTO_1.LoanDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "updateLoan", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoanDTO_1.LoanDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "deleteLoan", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "findLoan", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "findAllLoans", null);
__decorate([
    (0, tsoa_1.Get)(`book/{id}`),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "findByAllByBook", null);
exports.LoanController = LoanController = __decorate([
    (0, tsoa_1.Route)("loans"),
    (0, tsoa_1.Tags)("Loan")
], LoanController);
