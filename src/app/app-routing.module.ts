import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import {BookFormComponent} from "./book-form/book-form.component";
import {LoginComponent} from "./admin/login/login.component";
import {CartComponent} from "./cart/cart.component";
import {RatingComponent} from "./rating/rating.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/:isbn', component: BookDetailsComponent },
  { path: 'admin', component: BookFormComponent },
  { path: 'admin/:isbn', component: BookFormComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'rating/:isbn', component: RatingComponent, pathMatch: 'full'},
  { path: 'profile', component: ProfileComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  /*imports: [RouterModule.forRoot(routes, {
      useHash: true
  })],*/
    exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
