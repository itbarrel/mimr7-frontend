import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentMessageRoutingModule } from './student-message-routing.module';
import { StudentMessageComponent } from './student-message/student-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StudentMessageComponent
  ],
  imports: [
    CommonModule,
    StudentMessageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ]
})
export class StudentMessageModule { }
