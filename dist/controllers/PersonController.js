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
exports.PersonController = void 0;
const tsoa_1 = require("tsoa");
const PersonDTO_1 = require("../models/dto/PersonDTO");
const PersonService_1 = require("../services/PersonService");
const BasicResponseDTO_1 = require("../models/dto/BasicResponseDTO");
const Person_1 = require("../models/Person");
let PersonController = class PersonController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.personService = new PersonService_1.PersonService();
    }
    createPerson(person, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPerson = yield this.personService.registerPerson(person);
                return success(201, new BasicResponseDTO_1.BasicResponseDto("Successfully created", newPerson));
            }
            catch (err) {
                return fail(400, new BasicResponseDTO_1.BasicResponseDto(err.message, undefined));
            }
        });
    }
    updatePerson(person, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPerson = yield this.personService.editPerson(person);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully updated", updatedPerson));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Failed to update", undefined));
            }
        });
    }
    deletePerson(person, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPerson = yield this.personService.deletePerson(person.id);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully deleted", deletedPerson));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on delete", err));
            }
        });
    }
    findPerson(id, success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const person = yield this.personService.findPerson(id);
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully found", person));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on search", err));
            }
        });
    }
    findAllPersons(success, fail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const persons = yield this.personService.getAllPersons();
                return success(200, new BasicResponseDTO_1.BasicResponseDto("Successfully found", persons));
            }
            catch (err) {
                return fail(404, new BasicResponseDTO_1.BasicResponseDto("Error on search", err));
            }
        });
    }
};
exports.PersonController = PersonController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PersonDTO_1.PersonDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "createPerson", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Person_1.Person, Function, Function]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "updatePerson", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Person_1.Person, Function, Function]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "deletePerson", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "findPerson", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "findAllPersons", null);
exports.PersonController = PersonController = __decorate([
    (0, tsoa_1.Route)("person"),
    (0, tsoa_1.Tags)("Person")
], PersonController);
