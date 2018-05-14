import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DateValueAccessorModule} from 'angular-date-value-accessor'
import { BookFormComponent} from ".././book-form/book-form.component";
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        DateValueAccessorModule
    ],
    declarations: [
        BookFormComponent,
        LoginComponent
    ]
})
export class AdminModule { }
