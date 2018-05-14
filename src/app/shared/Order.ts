import { Book } from './book';
export { Book } from './book';

export class Order {
    constructor (
        public books: Book[],
        public brutto: number,
        public netto: number,
        public created_at: string
    ) {  }
}
