import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassListAddComponent } from './class-list-add/class-list-add.component';
import { ClassListComponent } from './class-list/class-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClassListComponent,
  },
  {
    path: 'add',
    component: ClassListAddComponent,
    pathMatch:'full'
  },
  {
    path: ':id',
    component: ClassListAddComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassListRoutingModule { }
