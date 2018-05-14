import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/authentication.service";
import {BookStoreService} from "../shared/book-store.service";
import {Order} from "../shared/Order";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bs-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user = [];

  orders : Order[];

  constructor( public authService: AuthService, public bs: BookStoreService,private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
      this.bs.getCurrentUser(this.authService.getCurrentUserId())
          .subscribe(u => this.user = u);
      this.bs.getOrders(this.authService.getCurrentUserId())
          .subscribe(o => this.orders = o);

  }

    logout(){
        this.authService.logout();
        this.router.navigate(['../'], { relativeTo: this.route })
    }

}
