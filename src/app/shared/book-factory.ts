import { Book } from './book';

export class BookFactory {

  static empty(): Book {
    return new Book(null, '', '', [], 0,new Date(),0, '', 0,[{id:0, user_id: 0, comment: '', rating:''}], [{id: 0, url: '', title: ''}], '');
  }

  static fromObject(rawBook: any): Book {
    return new Book(
      rawBook.id,
      rawBook.isbn,
      rawBook.title,
      rawBook.authors,
      rawBook.price,
      typeof(rawBook.published) === 'string' ?
        new Date(rawBook.published) : rawBook.published,
      rawBook.user_id,
      rawBook.subtitle,
      rawBook.rating,
      rawBook.ratings,
      rawBook.thumbnails,
      rawBook.description,
    );
  }
}
