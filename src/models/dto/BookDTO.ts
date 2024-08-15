export class BookDTO{
    id?:number;
    title: string;
    author: string;
    category_id: number;

    constructor(id?:number, title?:string, author?:string, category_id?:number) {
        this.id = id || 0;
        this.title = title || '';
        this.author = author || '';
        this.category_id = category_id || 0;
    }
}