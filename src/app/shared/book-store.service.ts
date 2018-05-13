import { Injectable } from '@angular/core';
import {Book, Author, Image} from "./book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookStoreService {
  private api = 'http://bookstore-rest.s1510456024.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Book>> {
    return this.http.get(`${this.api}/books`)
      .retry(3).catch(this.errorHandler);
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.api}/book/${isbn}`)
      .retry(3).catch(this.errorHandler);
  }

  create(book: Book): Observable<any> {
    return this.http.post(`${this.api}/book`, book)
      .catch(this.errorHandler);
  }

  update(book: Book): Observable<any> {
    return this.http.put(`${this.api}/book/${book.isbn}`, book)
      .catch(this.errorHandler);
  }

  remove(isbn: string): Observable<any> {
    console.log(isbn);
    return this.http.delete(`${this.api}/book/${isbn}`)
      .catch(this.errorHandler);
  }

  getAllSearch(searchTerm: string): Observable<Array<Book>> {
    return this.http
      .get<Book>(`${this.api}/books/search/${searchTerm}`)
      .retry(3).catch(this.errorHandler);
  }

  getCart() : Observable<Array<Book>> {
      return this.http.get(`${this.api}/order/status/cart`)
          .retry(3).catch(this.errorHandler);
  }

  addToCart() : Observable<Book> {
    let body = "{\n" +
          "\t\"user_id\" : 1,\n" +
          "\t\"orderItems\" : [{\n" +
          "\t\t\"book\" : \"buch 2\",\n" +
          "\t\t\"price\" : 82.99\n" +
          "\t}]\n" +
          "}";
    return this.http.post(`${this.api}/order`, body)
        .retry(3).catch(this.errorHandler);
  }

  private errorHandler(error: Error | any): Observable<any> {
    return Observable.throw(error);
  }
}
