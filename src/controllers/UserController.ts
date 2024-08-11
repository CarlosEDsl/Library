import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { UserDTO } from "../models/dto/UserDTO";
import { UserService } from "../services/UserService";
import { BasicResponseDto } from "../models/dto/BasicResponseDTO";
import { User } from "../models/User";

@Route("user")
@Tags("User")
export class UserController extends Controller {
    userService = new UserService();

    @Post()
    async createUser(
        @Body() user: UserDTO,
        @Res() success: TsoaResponse<201, BasicResponseDto>,
        @Res() fail: TsoaResponse<400, BasicResponseDto>
    ): Promise<void> {
        try {
            const newUser = await this.userService.registerUser(user);
            return success(201, new BasicResponseDto("Successfully created", newUser));
        } catch (err: any) {
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put()
    async updateUser(
        @Body() user: User,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const updatedUser = await this.userService.editUser(user);
            return success(200, new BasicResponseDto("Successfully updated", updatedUser));
        } catch (err) {
            return fail(404, new BasicResponseDto("Failed to update", undefined));
        }
    }

    @Delete()
    async deleteUser(
        @Body() user: User,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const deletedUser = await this.userService.deleteUser(user.id);
            return success(200, new BasicResponseDto("Successfully deleted", deletedUser));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on delete", err));
        }
    }

    @Get("id/{id}")
    async findUser(
        @Path() id: number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise<void> {
        try {
            const user = await this.userService.findUser(id);
            return success(200, new BasicResponseDto("Successfully found", user));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search", err));
        }
    }

    @Get("all")
    async findAllUsers(
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise< | void>{
        try {
            const users = await this.userService.getAllUsers();
            return success(200, new BasicResponseDto("Successfully found", users));
        } catch (err) {
            return fail(404, new BasicResponseDto("Error on search", err));
        }
    }
}