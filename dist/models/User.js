"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(personId, password, id) {
        this._id = id || 0;
        this._personId = personId;
        this._password = password;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get personId() {
        return this._personId;
    }
    set personId(value) {
        this._personId = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
}
exports.User = User;
