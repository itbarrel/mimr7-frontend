import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassListRoutingModule } from './class-list-routing.module';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassListAddComponent } from './class-list-add/class-list-add.component';
import { ClassListActionComponent } from './class-list-action/class-list-action.component';


import { MaterialModule } from 'src/app/material.module';
import { NgIconsModule } from '@ng-icons/core';
import { QuillModule } from 'ngx-quill'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { bootstrapCaretDownFill,bootstrapPlusCircle,bootstrapPencilSquare } from '@ng-icons/bootstrap-icons';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClassListComponent,
    ClassListAddComponent,
    ClassListActionComponent
  ],
  imports: [
    CommonModule,
    ClassListRoutingModule,
    MaterialModule,
    NgIconsModule.withIcons({ bootstrapCaretDownFill,bootstrapPlusCircle,bootstrapPencilSquare }),
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ClassListModule { }
