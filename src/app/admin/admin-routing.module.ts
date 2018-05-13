import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {BookFormComponent} from "./book-form/book-form.component";

const routes: Routes = [
    { path: 'admin', component: BookFormComponent},
    { path: 'admin:isbn', component: BookFormComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
