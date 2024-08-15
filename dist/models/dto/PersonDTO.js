"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonDTO = void 0;
class PersonDTO {
    constructor(id, name, email) {
        this.id = id || 0;
        this.name = name || '';
        this.email = email || '';
    }
}
exports.PersonDTO = PersonDTO;
