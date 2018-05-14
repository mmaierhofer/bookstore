import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../shared/book";
import {AuthService} from "../shared/authentication.service";

@Component({
  selector: 'bs-home',
    templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService) { }

  bookSelected(book: Book) {
    this.router.navigate(['../books', book.isbn], { relativeTo: this.route });
  }

    getLoginLabel(){
        if(this.authService.isLoggedIn()){
            return "Logout";
        } else {
            return "Login";
        }
    }
}
