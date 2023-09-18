import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class/class.component';
import { ClassAddComponent } from './class-add/class-add.component';
import { ImportStudentsComponent } from './import-students/import-students.component';
import { ClassActionsComponent } from './class-actions/class-actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ToastrModule } from 'ngx-toastr';
// import { FontAwesomeComponent } from "./font-awesome/font-awesome.component";
import { ComponentsModule } from '../shared/components/components.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { MatBadgeModule } from '@angular/material/badge';
import { ImportContentsComponent } from './import-contents/import-contents.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CompletedScheduleComponent } from './completed-schedule/completed-schedule.component';
import { ScheduleStudentsComponent } from './schedule-students/schedule-students.component';
@NgModule({
  declarations: [
    ClassComponent,
    ClassAddComponent,
    ImportStudentsComponent,
    ClassActionsComponent,
    ImportContentsComponent,
    ScheduleComponent,
    ScheduleAddComponent,
    CompletedScheduleComponent,
    ScheduleStudentsComponent,
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    MatIconModule,
    NgxDatatableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CKEditorModule,
    ToastrModule.forRoot(),
    ComponentsModule,
    MatTooltipModule,
    MatSelectModule,
    SharedModule,
    MatBadgeModule,
    MatCheckboxModule,
  ],
})
export class ClassModule {}
