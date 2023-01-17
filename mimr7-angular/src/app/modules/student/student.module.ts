import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student/student.component';
import { StudentActionComponent } from './student-action/student-action.component';
import { ClassListAddComponent } from './class-list-add/class-list-add.component';
import { ClassListComponent } from './class-list/class-list.component';

import { MaterialModule } from 'src/app/material.module';
import { NgIconsModule } from '@ng-icons/core';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  bootstrapCaretDownFill,
  bootstrapPlusCircle,
  bootstrapPencilSquare,
  bootstrapSearch,
  bootstrapPersonPlus,
  bootstrapPersonX,
  bootstrapClipboard2Plus,
  bootstrapClipboard2Minus,
} from '@ng-icons/bootstrap-icons';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentAddComponent } from './student-add/student-add.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationAddComponent } from './organization-add/organization-add.component';
import { ImportStudentsComponent } from './import-students/import-students.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImportContentComponent } from './import-content/import-content.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentActionComponent,
    StudentAddComponent,
    ClassListAddComponent,
    ClassListComponent,
    OrganizationComponent,
    OrganizationAddComponent,
    ImportStudentsComponent,
    ImportContentComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MaterialModule,
    NgIconsModule.withIcons({
      bootstrapCaretDownFill,
      bootstrapPlusCircle,
      bootstrapPencilSquare,
      bootstrapSearch,
      bootstrapPersonPlus,
      bootstrapPersonX,
      bootstrapClipboard2Plus,
      bootstrapClipboard2Minus,
    }),
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DragDropModule,
    SharedModule,
  ],
})
export class StudentModule {}
