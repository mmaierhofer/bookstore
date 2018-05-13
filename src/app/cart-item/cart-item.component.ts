import {Component, Input, OnInit} from '@angular/core';
import {Book, Author, Image} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'a.bs-cart-item',
    templateUrl: './cart-item.component.html',
    styles: []
})
export class CartItemComponent implements OnInit {
    @Input() book: Book
    constructor() { }

    ngOnInit() { }

}
