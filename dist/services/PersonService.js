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
exports.PersonService = void 0;
const Person_1 = require("../models/Person");
const PersonRepository_1 = require("../repositories/PersonRepository");
class PersonService {
    constructor() {
        this.personRepository = PersonRepository_1.PersonRepository.getInstance();
    }
    registerPerson(personDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = this.dtoToPerson(personDTO);
            try {
                yield this.emailVerifier(person.email);
            }
            catch (err) {
                throw err;
            }
            return yield this.personRepository.insertPerson(person);
        });
    }
    editPerson(personDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const person = this.dtoToPerson(personDTO);
            person.id = (_a = personDTO.id) !== null && _a !== void 0 ? _a : 0;
            try {
                console.log(yield this.personRepository.findPersonById(person.id));
                if (!(yield this.personRepository.findPersonById(person.id)))
                    throw new Error(`id: ${person.id} don't exist in persons`);
                if ((yield this.personRepository.findPersonById(person.id)).email != person.email)
                    yield this.emailVerifier(person.email);
            }
            catch (err) {
                throw err;
            }
            return yield this.personRepository.updatePerson(person);
        });
    }
    deletePerson(personDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = this.dtoToPerson(personDTO);
            const deletePersonId = yield this.personRepository.findPersonById(person.id);
            const deletePersonEmail = yield this.personRepository.findPersonByEmail(person.email);
            if (deletePersonId != deletePersonEmail) {
                throw new Error("Email and ID don't match");
            }
            return yield this.personRepository.deletePerson(person.id);
        });
    }
    findPerson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield this.personRepository.findPersonById(id);
            return person;
        });
    }
    getAllPerson() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.personRepository.findAllPersons();
        });
    }
    emailVerifier(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.personRepository.findPersonByEmail(email)) {
                throw new Error("email already in use");
            }
        });
    }
    dtoToPerson(dto) {
        return new Person_1.Person(dto.name, dto.email);
    }
}
exports.PersonService = PersonService;
