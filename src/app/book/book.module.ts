import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';


@NgModule({
    imports: [
        CommonModule,
        BookRoutingModule
    ],
    declarations: [
        BookListComponent, BookListItemComponent,
        BookDetailsComponent
    ]
})
export class BookModule { }