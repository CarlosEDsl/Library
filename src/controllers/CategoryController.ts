import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CategoryDTO } from "../models/dto/CategoryDTO";
import { CategoryService } from "../services/CategoryService";
import { BasicResponseDto } from "../models/dto/BasicResponseDTO";
import { Category } from "../models/Category";

@Route("category")
@Tags("Category")
export class CategoryController extends Controller{
    categoryService = new CategoryService();

    @Post()
    async createCategory(
        @Body() category:CategoryDTO,
        @Res() success: TsoaResponse<201, BasicResponseDto>,
        @Res() fail: TsoaResponse<400, BasicResponseDto>
    ): Promise< | void> {
        try {
            const newCategory = await this.categoryService.registerCategory(category);
            return success(201, new BasicResponseDto("Successful created", newCategory));
        } catch(err:any) {
            return fail(400, new BasicResponseDto(err.message, undefined))
        }
    }

    @Put()
    async updateCategory(
        @Body() category:CategoryDTO,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise< | void> {
        try {
            const updatedCategory = await this.categoryService.editCategory(category);
            return success(200, new BasicResponseDto("Successfull updated", updatedCategory));
        } catch(err) {
            return fail(404, new BasicResponseDto("Failed to update", undefined));
        }
    }

    @Delete()
    async deleteCategory(
        @Body() category:CategoryDTO,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ): Promise< | void> {
        try {
            const deletedCategory = await this.categoryService.deleteCategory(category);
            return success(200, new BasicResponseDto("Successfull deleted", deletedCategory));
        } catch(err) {
            return fail(404, new BasicResponseDto("error on delete", err))
        }
    }

    @Get("id/{id}")
    async findCategory(
        @Path() id:number,
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ) {
        try {
            const category = await this.categoryService.findCategory(id);
            return success(200, new BasicResponseDto("Successfull found", category));
        } catch(err) {
            return fail(404, new BasicResponseDto("error on search", err))
        }
    }

    @Get("all")
    async findAllCategories(
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() fail: TsoaResponse<404, BasicResponseDto>
    ) {
        try {
            const category = await this.categoryService.getAllCategories();
            return success(200, new BasicResponseDto("Successfull found", category));
        } catch(err) {
            return fail(404, new BasicResponseDto("error on search", err))
        }
    }
}   