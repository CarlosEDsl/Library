export class BookDTO{
    title: string;
    author: string;
    category_id: number;

    constructor(title?:string, author?:string, category_id?:number) {
        this.title = title || '';
        this.author = author || '';
        this.category_id = category_id || 0;
    }
}