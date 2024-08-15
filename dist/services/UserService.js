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
exports.UserService = void 0;
const User_1 = require("../models/User");
const PersonRepository_1 = require("../repositories/PersonRepository");
const UserRepository_1 = require("../repositories/UserRepository");
class UserService {
    constructor() {
        this.userRepository = UserRepository_1.UserRepository.getInstance();
        this.personRepository = PersonRepository_1.PersonRepository.getInstance();
    }
    registerUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.dtoToUser(userDTO);
            try {
                this.personVerifier(user.personId);
            }
            catch (err) {
                throw err;
            }
            return yield this.userRepository.updateUser(user);
        });
    }
    editUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.dtoToUser(userDTO);
            try {
                this.personVerifier(user.personId);
            }
            catch (err) {
                throw err;
            }
            return yield this.userRepository.updateUser(user);
        });
    }
    deleteUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.dtoToUser(userDTO);
            const deletePerson = yield this.userRepository.findUser(user.id);
            if (deletePerson.personId != user.personId || deletePerson.password != user.password) {
                throw new Error("data don't match");
            }
            return yield this.userRepository.deleteUser(user.id);
        });
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUser(id);
            return user;
        });
    }
    findUserByPersonId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserByPersonId(id);
            return user;
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.personRepository.findAllPersons();
        });
    }
    personVerifier(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield this.personRepository.findPersonById(personId);
            if (!person)
                throw new Error("this person don't exist");
            if ((yield this.userRepository.findUser(personId)) != null)
                throw new Error("this person already have an user");
        });
    }
    dtoToUser(dto) {
        const user = new User_1.User(dto.personId, dto.password);
        return user;
    }
}
exports.UserService = UserService;
