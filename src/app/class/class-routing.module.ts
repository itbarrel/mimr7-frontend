import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassAddComponent } from './class-add/class-add.component';
import { ClassComponent } from './class/class.component';
import { ImportContentsComponent } from './import-contents/import-contents.component';
import { ImportStudentsComponent } from './import-students/import-students.component';

const routes: Routes = [
  {
    path: '',
    component: ClassComponent,
  },
  {
    path: 'add',
    component: ClassAddComponent,
  },
  {
    path: ':id',
    component: ClassAddComponent,
  },
  {
    path: ':id/import-students',
    component: ImportStudentsComponent,
  },
  {
    path: ':id/import-contents',
    component: ImportContentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
