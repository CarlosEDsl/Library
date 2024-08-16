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
const LoanRepository_1 = require("../repositories/LoanRepository");
const PersonRepository_1 = require("../repositories/PersonRepository");
const UserRepository_1 = require("../repositories/UserRepository");
class UserService {
    constructor() {
        this.userRepository = UserRepository_1.UserRepository.getInstance();
        this.personRepository = PersonRepository_1.PersonRepository.getInstance();
        this.loanRepository = LoanRepository_1.LoanRepository.getInstance();
    }
    registerUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.dtoToUser(userDTO);
            try {
                yield this.personVerifier(user.personId);
            }
            catch (err) {
                throw err;
            }
            return yield this.userRepository.insertUser(user);
        });
    }
    editUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = this.dtoToUser(userDTO);
            user.id = (_a = userDTO.id) !== null && _a !== void 0 ? _a : 0;
            try {
                if ((yield this.userRepository.findUser(user.id)).personId != user.personId)
                    yield this.personVerifier(user.personId);
            }
            catch (err) {
                throw err;
            }
            return yield this.userRepository.updateUser(user);
        });
    }
    deleteUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = this.dtoToUser(userDTO);
            user.id = (_a = userDTO.id) !== null && _a !== void 0 ? _a : 0;
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
            if (!user)
                throw new Error("not found");
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
            return yield this.userRepository.findAllUsers();
        });
    }
    personVerifier(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield this.personRepository.findPersonById(personId);
            if (!person)
                throw new Error("this person don't exist");
            if ((yield this.userRepository.findUserByPersonId(personId)) != null)
                throw new Error("this person already have an user");
        });
    }
    referencesVerification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const loans = yield this.loanRepository.findLoanByUserId(userId);
            if (loans.length > 0)
                throw new Error("There is books with this category yet, update then before delete this category");
        });
    }
    dtoToUser(dto) {
        const user = new User_1.User(dto.personId, dto.password);
        return user;
    }
}
exports.UserService = UserService;
