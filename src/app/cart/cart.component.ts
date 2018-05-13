import {Component, OnInit } from '@angular/core';
import {Book, Author, Image } from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {BookFactory} from "../shared/book-factory";
import {AuthService} from "../shared/authentication.service";

@Component({
    selector: 'bs-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

books: Book[];
price: number;

constructor(private bs: BookStoreService,  public authService: AuthService){}


ngOnInit() {
    this.price = 0;
    this.books = JSON.parse(localStorage.getItem("currentCartItems"));

    for(let i = 0; i<this.books.length; i++) {
        this.price = this.books[i].price+this.price;
        console.log(this.price);
    }


}
}
