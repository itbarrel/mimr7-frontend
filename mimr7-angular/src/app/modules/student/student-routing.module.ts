import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassListAddComponent } from './class-list-add/class-list-add.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ImportStudentsComponent } from './import-students/import-students.component';
import { OrganizationAddComponent } from './organization-add/organization-add.component';
import { OrganizationComponent } from './organization/organization.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: 'organizations',
    component: OrganizationComponent
  },
  {
    path: 'organizations/add',
    component: OrganizationAddComponent
  },
  {
    path: 'organizations/:id',
    component: OrganizationAddComponent
  },
  {
    path: 'classes',
    component: ClassListComponent
  },
  {
    path: 'classes/add',
    component: ClassListAddComponent
  },
  {
    path: 'classes/:id',
    component: ClassListAddComponent
  },
  {
    path: 'classes/:id/import-students',
    component: ImportStudentsComponent
  },
  {
    path: 'students',
    component: StudentComponent,
  },
  {
    path: 'students/add',
    component: StudentAddComponent,
    pathMatch:'full'
  },
  {
    path: 'students/:id',
    component: StudentAddComponent,
    pathMatch:'full'
  },
  // {
  //   path: ':id/highlights',
  //   component: HighlightsComponent,
  //   pathMatch:'full'
  // },
  // {
  //   path: ':id/highlights/add',
  //   component: HighlightAddComponent,
  //   pathMatch:'full'
  // },
  // {
  //   path: ':id/highlights/:hid',
  //   component: HighlightAddComponent,
  //   pathMatch:'full'
  // },
  // {
  //   path: ':id/highlights/:hid/messages',
  //   component: MessagesComponent,
  //   pathMatch:'full'
  // },
  // {
  //   path: ':id/highlights/:hid/messages/:mid',
  //   component: MessagesAddComponent,
  //   pathMatch:'full'
  // },
  // {
  //   path: ':id/highlights/:hid/messages/add',
  //   component: MessagesAddComponent,
  //   pathMatch:'full'
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
