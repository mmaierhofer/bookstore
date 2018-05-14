import {Component, OnInit } from '@angular/core';
import {Book, Author, Image } from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {HomeComponent} from "../home/home.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bs: BookStoreService,private router: Router, private route: ActivatedRoute){ }

  ngOnInit() {
    this.bs.getAll().subscribe(res => this.books = res);
  }

    bookSelected(book: Book) {
        this.router.navigate(['../books', book.isbn], { relativeTo: this.route });
    }
}
