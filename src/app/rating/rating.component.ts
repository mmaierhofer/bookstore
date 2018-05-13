import { Component, OnInit } from '@angular/core';
import {BookFactory} from "../shared/book-factory";
import {Book} from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication.service";
import {BookStoreService} from "../shared/book-store.service";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'bs-rating',
  templateUrl: './rating.component.html',
  styles: []
})
export class RatingComponent implements OnInit {

    book: Book = BookFactory.empty();
    ratingForm: FormGroup;

  constructor(private fb: FormBuilder,
              private bs: BookStoreService,
              private router: Router,
              private route: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit() {
      const params = this.route.snapshot.params;
      this.bs.getSingle(params['isbn'])
          .subscribe(b => this.book = b);
  }

  submitForm() {
        // filter empty values




        const book: Book = BookFactory.fromObject(this.ratingForm.value);
        //just copy the rating and authors
        book.rating = this.book.rating;
        book.authors = this.book.authors;


            book.user_id = 1;// jsut for testing
            this.bs.create(book).subscribe(res => {
                this.book = BookFactory.empty();
                this.ratingForm.reset(BookFactory.empty());
            });

    }



}
