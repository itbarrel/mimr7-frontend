import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from '../authentication/page404/page404.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full',
  },
  {
    path: 'students',
    component: Dashboard1Component,
    loadChildren: () =>
      import('../student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'contents',
    component: Dashboard1Component,
    loadChildren: () =>
      import('../content/content.module').then((m) => m.ContentModule),
  },
  {
    path: 'organizations',
    component: Dashboard1Component,
    loadChildren: () =>
      import('../account-organization/account-organization.module').then(
        (m) => m.AccountOrganizationModule
      ),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('../location/location.module').then((m) => m.LocationModule),
  },
  // {
  //   path: 'classes',
  //   component: Dashboard1Component,
  //   loadChildren: () =>
  //     import('../schedule/schedule.module').then((m) => m.ScheduleModule),
  // },

  {
    path: 'classes',
    component: Dashboard1Component,
    loadChildren: () =>
      import('../class/class.module').then((m) => m.ClassModule),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
