import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {AuthService} from "../shared/authentication.service";
import { BookFormErrorMessages } from './book-form-error-messages';
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {Book} from "../shared/book";
import {Author} from "../shared/author";

@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  myForm: FormGroup;
  book = BookFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingBook = false;
  thumbnails: FormArray;
  authors : FormArray;
  constructor(private fb: FormBuilder, private bs: BookStoreService,
              private route: ActivatedRoute, private router: Router,private authService: AuthService) { }

  ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    if (isbn) {
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book => {
          this.book = book;
          this.initBook();
        });
    }
    this.initBook();
  }

  initBook() {
    this.buildThumbnailsArray();
    this.buildAuthorsArray();

    this.myForm = this.fb.group({
      id: this.book.id,
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      isbn: [this.book.isbn, [
        Validators.required
      ]],
      description: this.book.description,
      authors: this.authors,
      price:  this.book.price,
      thumbnails: this.thumbnails,
      published: new Date(this.book.published)
    });
    this.myForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  buildThumbnailsArray() {
    this.thumbnails = this.fb.array(
      this.book.images.map(
        t => this.fb.group({
          id: this.fb.control(t.id),
          url: this.fb.control(t.url,[Validators.required]),
          title: this.fb.control(t.title)
        })
      )
    );
  }

  buildAuthorsArray() {
      this.authors = this.fb.array(
          this.book.authors.map(
              t => this.fb.group({
                  id: this.fb.control(t.id),
                  firstName: this.fb.control(t.firstName),
                  lastName: this.fb.control(t.lastName)
              })
          )
      );
      if(!this.authors.length) this.addAuthorControl();
  }

  addThumbnailControl() {
    this.thumbnails.push(this.fb.group({ url: null, title: null }));
  }

  removeThumbnailControl(index) {
    this.thumbnails.removeAt(index);
  }

    addAuthorControl() {
        this.authors.push(this.fb.group({ firstName: null, lastName: null }));
    }

    removeAuthorControl(index) {
        this.authors.removeAt(index);
    }

  submitForm() {
    // filter empty values
    this.myForm.value.thumbnails = this.myForm.value.thumbnails.filter(thumbnail => thumbnail.url);



    const book: Book = BookFactory.fromObject(this.myForm.value);
    //just copy the rating and authors
    book.rating = this.book.rating;


    if (this.isUpdatingBook) {
      console.log(book);
      this.bs.update(book).subscribe(res => {
        this.router.navigate(['../../books', book.isbn], { relativeTo: this.route });
      });
    } else {
      book.user_id = this.authService.getCurrentUserId();
      this.bs.create(book).subscribe(res => {
        this.book = BookFactory.empty();
        this.myForm.reset(BookFactory.empty());
          this.router.navigate(['../books'], { relativeTo: this.route });
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.myForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
