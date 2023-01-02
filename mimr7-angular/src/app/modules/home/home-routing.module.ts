import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'contents',
    component: HomeComponent,
    loadChildren: () =>
      import('../content/content.module').then((m) => m.ContentModule),
  },
  {
    path: '',
    component: HomeComponent,
    loadChildren: () =>
      import('../student/student.module').then((m) => m.StudentModule),
  },
  // {
  //   path: 'class-lists',
  //   component: HomeComponent,
  //   loadChildren: () =>
  //     import('../class-list/class-list.module').then((m) => m.ClassListModule),
  // },
  // {
  //   path: '',
  //   redirectTo: 'contents',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
