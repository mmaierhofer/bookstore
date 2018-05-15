import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import {BookStoreService} from "./shared/book-store.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SearchComponent } from './search/search.component';
import { BookFormComponent } from './book-form/book-form.component';
import { ReactiveFormsModule} from "@angular/forms";
import {DateValueAccessorModule} from "angular-date-value-accessor";
import { LoginComponent } from './admin/login/login.component';
import {AuthService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RatingComponent } from './rating/rating.component';
import { ProfileComponent } from './profile/profile.component';
import { CartAlertComponent } from './book-details/cart-alert/cart-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    SearchComponent,
    BookFormComponent,
    LoginComponent,
    CartComponent,
    //CartItemComponent,
    RatingComponent,
    ProfileComponent,
    CartAlertComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule,
    ReactiveFormsModule, DateValueAccessorModule
  ],
  providers: [BookStoreService,AuthService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
      },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
