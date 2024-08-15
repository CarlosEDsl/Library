"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor(id, personId, password) {
        this.id = id || 0;
        this.personId = personId || 0;
        this.password = password || '';
    }
}
exports.UserDTO = UserDTO;
