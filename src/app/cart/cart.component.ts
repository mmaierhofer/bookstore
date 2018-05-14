import {Component, OnInit } from '@angular/core';
import {Book, Author, Image } from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {BookFactory} from "../shared/book-factory";
import {AuthService} from "../shared/authentication.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'bs-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

books: Book[];
price: number;

constructor(private bs: BookStoreService,  public authService: AuthService, private router: Router,private route: ActivatedRoute){}


ngOnInit() {
    this.price = 0;
    this.books = JSON.parse(localStorage.getItem("currentCartItems"));

    if(this.books) {
        for(let i = 0; i<this.books.length; i++) {
            this.price = this.books[i].price+this.price;
        }
    }
    else {
        this.books = [];
    }

}

order() {
    this.books = JSON.parse(localStorage.getItem("currentCartItems"));

    let body = '{' +
        '"user_id": ' + this.authService.getCurrentUserId() + ',' +
        '"brutto":' + this.price + ',' +
        '"netto":' + (this.price * 0.1) + ',' +
        '"books": [';
    for(let i = 0; i<this.books.length; i++) {
        body += '{"isbn":"'+this.books[i]['isbn']+'"},';
    }
    body = body.substr(0,body.length-1);
    body += ']}';

    console.log(body);

    this.bs.order(JSON.parse(body)).subscribe(res => {
       this.orderSuccess();
    });

}

orderSuccess() {
    this.router.navigate(['../books'], { relativeTo: this.route });
    localStorage.removeItem('currentCartItems');
}

}
