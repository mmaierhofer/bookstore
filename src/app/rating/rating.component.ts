import { Component, OnInit } from '@angular/core';
import {BookFactory} from "../shared/book-factory";
import {Book} from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication.service";
import {BookStoreService} from "../shared/book-store.service";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {Rating} from "../shared/rating";
@Component({
  selector: 'bs-rating',
  templateUrl: './rating.component.html',
  styles: []
})
export class RatingComponent implements OnInit {

    book : Book = BookFactory.empty();
    rating = Rating;
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

      this.ratingForm = this.fb.group({
          comment: this.book.ratings['comment'],
          rating: [this.book.ratings['rating'],[
              Validators.required
          ]]
      });
  }

  submitForm() {


        let body = '{' +
            '"user_id" : '+ this.authService.getCurrentUserId() +',' +
            '"book_id" : '+ this.book.id +',' +
            '"comment" : "'+ this.ratingForm.value.comment +'",' +
            '"rating" : "'+ this.ratingForm.value.rating +'"' +
            '}';

      console.log(body);

        this.bs.createRating(JSON.parse(body)).subscribe(res => {
            this.router.navigate(['../../books'], { relativeTo: this.route });
        });
    }



}
