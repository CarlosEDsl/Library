import { BookService } from './BookService';
import { CategoryDTO } from './../models/dto/CategoryDTO';
import { Category } from "../models/Category";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { BookRepository } from '../repositories/BookRepository';

export class CategoryService{

    categoryRepository = CategoryRepository.getInstance();
    bookRepository = BookRepository.getInstance();

    constructor() {

    }

    async registerCategory(categoryDTO:CategoryDTO) {
        const category = this.dtoToCategory(categoryDTO);
        try{
            await this.nameVerification(category.name);
        } catch(err) {
            throw err;
        }

        const newCategory = await this.categoryRepository.insertCategory(category);
        return newCategory;
    }

    async editCategory(categoryDTO:CategoryDTO) {
        const category = this.dtoToCategory(categoryDTO);
        category.id = categoryDTO.id?? 0;
        try{
            await this.nameVerification(category.name);
        } catch(err) {
            throw err;
        }

        const editedCategory = await this.categoryRepository.updateCategory(category);
        return editedCategory;
    }

    async deleteCategory(categoryDTO:CategoryDTO) {
        const category = this.dtoToCategory(categoryDTO);
        category.id = categoryDTO.id?? 0;
        const categoryFoundById = await this.categoryRepository.findCategoryById(category.id);

        if(!(categoryFoundById)){
            throw new Error("this category don't exist");
        }

        if(categoryFoundById.name != category.name){
            throw new Error("name and id dont match");
        }
        try{
            await this.referencesVerification(category);
        } catch(err) {
            throw err;
        }
        
        await this.categoryRepository.deleteCategory(category);
    }

    async findCategory(id:number) {
        const category = await this.categoryRepository.findCategoryById(id);
        if(!category)
            throw new Error("not found")
        return category;
    }

    async getAllCategories() {
        return await this.categoryRepository.findAllCategories();
    }

    //Verifications

    async nameVerification(name:string) {
        if(await this.categoryRepository.findCategoryByName(name) != null)
            throw new Error("this category already exist")
    }

    async referencesVerification(category:Category) {
        const books = await this.bookRepository.findAllBooksByCategory(category.id);
        if(books.length > 0 )
            throw new Error("There is books with this category yet, update then before delete this category");
    }

    dtoToCategory(dto:CategoryDTO) {
        return new Category(undefined, dto.name);
    }
}
