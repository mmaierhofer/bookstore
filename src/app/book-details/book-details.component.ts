import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookFactory} from "../shared/book-factory";
import {AuthService} from "../shared/authentication.service";
import {Rating} from "../shared/rating";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {
  book: Book = BookFactory.empty();
  ratings = [];
  full = [];
  alert = false;

  constructor(
    private bs: BookStoreService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }


  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingleWithRating(params['isbn'])
      .subscribe(r => this.book = r['book']);
      this.bs.getSingleWithRating(params['isbn'])
          .subscribe(r => this.ratings = r['ratings']);

  }

  getRating(num: number) {
    return new Array(num);
  }


  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bs.remove(this.book.isbn)
        .subscribe(res => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }

  addRecommendation() {
      this.router.navigate(['../../rating/'+this.book.isbn], { relativeTo: this.route });
  }

  addToCart() {
    //localStorage.removeItem('currentCartItems');
    let currentCartItems = localStorage.getItem('currentCartItems');
    if (currentCartItems == null) {
        currentCartItems = "["+JSON.stringify(this.book)+"]";
    }
    else {
        currentCartItems = currentCartItems.substr(0,currentCartItems.length-1);
        currentCartItems += ","+JSON.stringify(this.book)+"]";
    }

    localStorage.setItem("currentCartItems",currentCartItems);

    this.alert = true;
  }
}
