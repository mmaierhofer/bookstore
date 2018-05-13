import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Author, Image, Book } from '../../shared/book';
import { BookStoreService} from "../../shared/book-store.service";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit{

  books: Book[];

  @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bs : BookStoreService) { }

  ngOnInit() {
      this.bs.getAll().subscribe(res => this.books = res);
  }

}
