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
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const UserDTO_1 = require("../models/dto/UserDTO");
const UserService_1 = require("../services/UserService");
const BasicResponseDTO_1 = require("../models/dto/BasicResponseDTO");
let UserController = class UserController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.userService = new UserService_1.UserService();
    }
    createUser(user, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userService.registerUser(user);
                return success(201, new BasicResponseDTO_1.BasicResponseDto("Successfully created", newUser));
            }
            catch (err) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto(err.message, undefined));
            }
        });
    }
    updateUser(user, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield this.userService.editUser(user);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully updated", updatedUser));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Failed to update", undefined));
            }
        });
    }
    deleteUser(user, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield this.userService.deleteUser(user);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully deleted", deletedUser));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on delete", err));
            }
        });
    }
    findUser(id, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findUser(id);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully found", user));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on search", err));
            }
        });
    }
    findAllUsers(success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUser();
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully found", users));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on search", err));
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDTO_1.UserDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDTO_1.UserDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserDTO_1.UserDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAllUsers", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("user"),
    (0, tsoa_1.Tags)("User")
], UserController);
