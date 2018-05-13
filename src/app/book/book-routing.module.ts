import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookFormComponent} from "../admin/book-form/book-form.component";
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailsComponent} from "./book-details/book-details.component";

const routes: Routes = [
    { path: 'books', component: BookListComponent},
    { path: 'books:isbn', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})



export class BookRoutingModule { }
