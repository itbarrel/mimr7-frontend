import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentMessageComponent } from './student-message/student-message.component';

const routes: Routes = [
  {
    path: ':hash',
    component: StudentMessageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentMessageRoutingModule {}
