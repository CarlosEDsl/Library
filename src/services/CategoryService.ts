import { CategoryDTO } from './../models/dto/CategoryDTO';
import { Category } from "../models/Category";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryService{

    categoryRepository = CategoryRepository.getInstance();

    constructor() {

    }

    async registerCategory(categoryDTO:CategoryDTO) {
        const category = this.dtoToCategory(categoryDTO);
        this.nameVerification(category.name);

        const newCategory = await this.categoryRepository.insertCategory(category);
        return newCategory;
    }

    async editCategory(categoryDTO:CategoryDTO) {
        const category = this.dtoToCategory(categoryDTO);
        this.nameVerification(category.name);

        const editedCategory = await this.categoryRepository.updateCategory(category);
        return editedCategory;
    }

    async deleteCategory(categoryDTO:CategoryDTO) {
        const category = this.dtoToCategory(categoryDTO);
        
        const removedCategory = await this.categoryRepository.deleteCategory(category)
        return removedCategory;
    }

    async findCategory(id:number) {
        const category = await this.categoryRepository.findCategoryById(id);
        return category;
    }

    async getAllCategories() {
        return await this.categoryRepository.findAllCategories();
    }

    async nameVerification(name:string) {
        if(await this.categoryRepository.findCategoryByName(name) != null)
            throw new Error("this category already exist")
    }

    dtoToCategory(dto:CategoryDTO) {
        return new Category(undefined, dto.name);
    }
}
