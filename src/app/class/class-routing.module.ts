import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassAddComponent } from './class-add/class-add.component';
import { ClassComponent } from './class/class.component';
import { ImportContentsComponent } from './import-contents/import-contents.component';
import { ImportStudentsComponent } from './import-students/import-students.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { CompletedScheduleComponent } from './completed-schedule/completed-schedule.component';
import { ScheduleStudentsComponent } from './schedule-students/schedule-students.component';
import { StudentsAnswerComponent } from './students-answer/students-answer.component';

const routes: Routes = [
  {
    path: '',
    component: ClassComponent,
    pathMatch: 'full',
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    pathMatch: 'full',
  },
  {
    path: 'completed-schedule',
    component: CompletedScheduleComponent,
    pathMatch: 'full',
  },
  {
    path: 'schedule/add',
    component: ScheduleAddComponent,
    pathMatch: 'full',
  },
  {
    path: 'schedule/:id',
    component: ScheduleAddComponent,
    pathMatch: 'full',
  },
  {
    path: 'schedule/:id/students',
    component: ScheduleStudentsComponent,
    pathMatch: 'full',
  },
  {
    path: 'schedule/:id/students/:sid/messages',
    component: StudentsAnswerComponent,
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: ClassAddComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: ClassAddComponent,
    pathMatch: 'full',
  },
  {
    path: ':id/import-students',
    component: ImportStudentsComponent,
    pathMatch: 'full',
  },
  {
    path: ':id/import-contents',
    component: ImportContentsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassRoutingModule {}
