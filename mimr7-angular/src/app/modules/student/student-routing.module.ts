import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
  // {
  //   path: 'add',
  //   component: ContentAddComponent,
  //   pathMatch:'full'

  // },
  // {
  //   path: ':id',
  //   component: ContentAddComponent,
  //   pathMatch:'full'
  // },
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
