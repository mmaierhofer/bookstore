import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { BookFactory } from "../../shared/book-factory";
import { BookStoreService } from "../../shared/book-store.service";
import { Book} from "../../shared/book";
import {BookFormErrorMessages} from "./book-form-error-messages";

@Component({
    selector: 'bs-book-form',
    templateUrl: './book-form.component.html',
    styles: []
})
export class BookFormComponent implements OnInit {

    myForm : FormGroup;
    book = BookFactory.empty();
    errors : { [key: string]: string } = {};
    isUpdating = false;
    thumbnails : FormArray;

    constructor(private fb: FormBuilder, private bs : BookStoreService,
                private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const isbn = this.route.snapshot.params['isbn'];
        // console.log(isbn);
        // existing book
        if (isbn) {
            this.isUpdating = true;
            this.bs.getSingle(isbn).subscribe(b => {
                this.book = b;
                this.initBook();
            });
        }
        this.initBook();
    }

    initBook ()  {
        console.log(this.book);

        this.buildThumbnailsArray();

        this.myForm = this.fb.group ({
            id: this.book.id,
            title: [this.book.title, Validators.required],
            subtitle : this.book.subtitle,
            isbn: [this.book.isbn, [
                Validators.required
            ]],
            description: this.book.description,
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
                    url: this.fb.control(t.url),
                    title: this.fb.control(t.title)
                })
            )

        );
    }

    addThumbnailControl() {
        this.thumbnails.push(this.fb.group({
            url: null,
            title: null
        }));
    }

    submitForm () {
        this.myForm.value.thumbnails =
            this.myForm.value.thumbnails.filter(thumbnail => thumbnail.url);
        const book : Book = BookFactory.fromObject(this.myForm.value);
        // just copy rating & authors
        book.rating = this.book.rating;
        book.authors = this.book.authors;

        if (this.isUpdating) {
            this.bs.update(book).subscribe(res => {
                this.router.navigate(['../../books', book.isbn], {
                    relativeTo: this.route
                });
            });

        } else {
          book.user_id = 1;
          this.bs.create(book).subscribe(res => {
            this.book = BookFactory.empty();
            this.myForm.reset(BookFactory.empty());
          })
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