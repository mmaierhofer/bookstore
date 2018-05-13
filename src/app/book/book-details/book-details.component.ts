import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Book } from '../../shared/book';
import { BookStoreService} from "../../shared/book-store.service";
import { ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../../shared/book-factory";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

    //@Input() book: Book;
    @Output() showListEvent = new EventEmitter<any>();

    book : Book = BookFactory.empty();

    constructor(private bs : BookStoreService,
                private router: Router,
                private route : ActivatedRoute) { }


    ngOnInit() {
        const params = this.route.snapshot.params;
       this.bs.getSingle(params['isbn']).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
    }

  getRating (num: number) {
      return new Array(num);
  }

  /*removeBook() {
        if (confirm('Buch wirklich löschen?')) {
            this.bs.remove(this.book.isbn)
                .subscribe(res => this.route)
        }
  }*/


}
