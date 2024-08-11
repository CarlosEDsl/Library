import { CategoryDTO } from "../models/dto/CategoryDTO";
import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryService{

    categoryRepository = CategoryRepository.getInstance();

    constructor() {

    }

    async registerCategory(category:CategoryDTO) {
        
    }
}