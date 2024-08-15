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
exports.RegisterRoutes = RegisterRoutes;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UserController_1 = require("./../controllers/UserController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const PersonController_1 = require("./../controllers/PersonController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LoanController_1 = require("./../controllers/LoanController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoryController_1 = require("./../controllers/CategoryController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const BookController_1 = require("./../controllers/BookController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UserDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "personId": { "dataType": "double", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PersonDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoanDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "bookId": { "dataType": "double", "required": true },
            "userId": { "dataType": "double", "required": true },
            "loanDate": { "dataType": "datetime", "required": true },
            "returnDate": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoryDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookDTO": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "title": { "dataType": "string", "required": true },
            "author": { "dataType": "string", "required": true },
            "category_id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/user', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.createUser)), function UserController_createUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                user: { "in": "body", "name": "user", "required": true, "ref": "UserDTO" },
                success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UserController_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'createUser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/user', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.updateUser)), function UserController_updateUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                user: { "in": "body", "name": "user", "required": true, "ref": "UserDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UserController_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'updateUser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/user', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.deleteUser)), function UserController_deleteUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                user: { "in": "body", "name": "user", "required": true, "ref": "UserDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UserController_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'deleteUser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/user/id/:id', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.findUser)), function UserController_findUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UserController_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'findUser',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/user/all', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.findAllUsers)), function UserController_findAllUsers(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UserController_1.UserController();
                yield templateService.apiHandler({
                    methodName: 'findAllUsers',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/person', ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController.prototype.createPerson)), function PersonController_createPerson(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                person: { "in": "body", "name": "person", "required": true, "ref": "PersonDTO" },
                success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PersonController_1.PersonController();
                yield templateService.apiHandler({
                    methodName: 'createPerson',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/person', ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController.prototype.updatePerson)), function PersonController_updatePerson(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                person: { "in": "body", "name": "person", "required": true, "ref": "PersonDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PersonController_1.PersonController();
                yield templateService.apiHandler({
                    methodName: 'updatePerson',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/person', ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController.prototype.deletePerson)), function PersonController_deletePerson(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                person: { "in": "body", "name": "person", "required": true, "ref": "PersonDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PersonController_1.PersonController();
                yield templateService.apiHandler({
                    methodName: 'deletePerson',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/person/id/:id', ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController.prototype.findPerson)), function PersonController_findPerson(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PersonController_1.PersonController();
                yield templateService.apiHandler({
                    methodName: 'findPerson',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/person/all', ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController)), ...((0, runtime_1.fetchMiddlewares)(PersonController_1.PersonController.prototype.findAllPerson)), function PersonController_findAllPerson(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PersonController_1.PersonController();
                yield templateService.apiHandler({
                    methodName: 'findAllPerson',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/loans', ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController)), ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController.prototype.createLoan)), function LoanController_createLoan(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                loan: { "in": "body", "name": "loan", "required": true, "ref": "LoanDTO" },
                success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LoanController_1.LoanController();
                yield templateService.apiHandler({
                    methodName: 'createLoan',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/loans/:id', ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController)), ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController.prototype.updateLoan)), function LoanController_updateLoan(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                loan: { "in": "body", "name": "loan", "required": true, "ref": "LoanDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LoanController_1.LoanController();
                yield templateService.apiHandler({
                    methodName: 'updateLoan',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/loans/:id', ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController)), ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController.prototype.deleteLoan)), function LoanController_deleteLoan(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                loan: { "in": "body", "name": "loan", "required": true, "ref": "LoanDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LoanController_1.LoanController();
                yield templateService.apiHandler({
                    methodName: 'deleteLoan',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/loans/:id', ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController)), ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController.prototype.findLoan)), function LoanController_findLoan(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LoanController_1.LoanController();
                yield templateService.apiHandler({
                    methodName: 'findLoan',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/loans/all', ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController)), ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController.prototype.findAllLoans)), function LoanController_findAllLoans(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LoanController_1.LoanController();
                yield templateService.apiHandler({
                    methodName: 'findAllLoans',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/loans/book/:id', ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController)), ...((0, runtime_1.fetchMiddlewares)(LoanController_1.LoanController.prototype.findByAllByBook)), function LoanController_findByAllByBook(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LoanController_1.LoanController();
                yield templateService.apiHandler({
                    methodName: 'findByAllByBook',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/category', ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController.prototype.createCategory)), function CategoryController_createCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                category: { "in": "body", "name": "category", "required": true, "ref": "CategoryDTO" },
                success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoryController_1.CategoryController();
                yield templateService.apiHandler({
                    methodName: 'createCategory',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/category', ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController.prototype.updateCategory)), function CategoryController_updateCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                category: { "in": "body", "name": "category", "required": true, "ref": "CategoryDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoryController_1.CategoryController();
                yield templateService.apiHandler({
                    methodName: 'updateCategory',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/category', ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController.prototype.deleteCategory)), function CategoryController_deleteCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                category: { "in": "body", "name": "category", "required": true, "ref": "CategoryDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoryController_1.CategoryController();
                yield templateService.apiHandler({
                    methodName: 'deleteCategory',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/category/id/:id', ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController.prototype.findCategory)), function CategoryController_findCategory(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoryController_1.CategoryController();
                yield templateService.apiHandler({
                    methodName: 'findCategory',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/category/all', ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController)), ...((0, runtime_1.fetchMiddlewares)(CategoryController_1.CategoryController.prototype.findAllCategories)), function CategoryController_findAllCategories(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoryController_1.CategoryController();
                yield templateService.apiHandler({
                    methodName: 'findAllCategories',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/book', ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController)), ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController.prototype.createBook)), function BookController_createBook(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                book: { "in": "body", "name": "book", "required": true, "ref": "BookDTO" },
                success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new BookController_1.BookController();
                yield templateService.apiHandler({
                    methodName: 'createBook',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/book', ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController)), ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController.prototype.updateBook)), function BookController_updateBook(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                book: { "in": "body", "name": "book", "required": true, "ref": "BookDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new BookController_1.BookController();
                yield templateService.apiHandler({
                    methodName: 'updateBook',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/book', ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController)), ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController.prototype.deleteBook)), function BookController_deleteBook(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                book: { "in": "body", "name": "book", "required": true, "ref": "BookDTO" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new BookController_1.BookController();
                yield templateService.apiHandler({
                    methodName: 'deleteBook',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/book/id/:id', ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController)), ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController.prototype.findBook)), function BookController_findBook(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new BookController_1.BookController();
                yield templateService.apiHandler({
                    methodName: 'findBook',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/book/all', ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController)), ...((0, runtime_1.fetchMiddlewares)(BookController_1.BookController.prototype.findAllBooks)), function BookController_findAllBooks(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
                fail: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new BookController_1.BookController();
                yield templateService.apiHandler({
                    methodName: 'findAllBooks',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
