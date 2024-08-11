export class CategoryDTO{
    name: string;

    constructor(name?: string) {
        this.name = name || '';
    }
}