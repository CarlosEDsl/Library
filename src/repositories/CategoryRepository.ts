import { Category } from './../models/Category';
import { executarComandoSQL } from "../databases/mysql";
export class CategoryRepository {

    private static instance: CategoryRepository;

    public static getInstance(): CategoryRepository {
        if(!CategoryRepository.instance) {
            CategoryRepository.instance = new CategoryRepository();
        }
        return CategoryRepository.instance;
    }

    constructor() {
        this.createTable();
    }

    private async createTable(){
        const query = `CREATE TABLE IF NOT EXISTS Library.category (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL
            )`
        try{
            const result = await executarComandoSQL(query, []);
            console.log("Table successful created", result);
        } catch(err) {
            console.error(err);
        }
    }

    async insertCategory(category:Category): Promise<Category> {
        const query = 'INSERT INTO Library.category(id, name) values(?, ?)';
        try{
            const result = await executarComandoSQL(query, [category.id, category.name]);
            category.id = result.insertId;
            return new Promise((resolve) => {
                resolve(category);
            })
        } catch(err) {
            console.error(err);
            throw err;
        }
    }   

    async updateCategory(category:Category): Promise<Category> {
        const query = 'UPDATE Library.category set name = ? where id = ?';
        try{
            const result = await executarComandoSQL(query, [category.name, category.id]);
            return new Promise((resolve) => {
                resolve(result);
            })
        } catch(err) {
            throw err;
        }
    }

    async deleteCategory(category:Category): Promise<Category> {
        const query = 'DELETE FROM Library.category where id = ?';
        try {
            const result = await executarComandoSQL(query, [category.id]);
            return new Promise((resolve) => {
                resolve(result);
            })
        } catch(err) {
            throw err
        }
    }

    async findCategoryById(id:number): Promise<Category> {
        const query = 'SELECT * FROM Library.category where id = ?';
        try {
            const result = await executarComandoSQL(query, [id]);
            return new Promise((resolve) => {
                resolve(result[0]);
            });
        } catch(err) {
            throw err;
        }
    }

    async findCategoryByName(name:string): Promise<Category> {
        const query = 'SELECT * FROM Library.category where name = ?';
        try {
            const result = await executarComandoSQL(query, [name]);
            return new Promise((resolve) => {
                resolve(result[0]);
            });
        } catch(err) {
            throw err;
        }
    }


    async findAllCategories(): Promise<Category> {
        const query = 'SELECT * FROM Library.category';
        try {
            const result = await executarComandoSQL(query, []);
            return new Promise((resolve) => {
                resolve(result);
            });
        } catch(err) {
            throw err;
        }
    }

}