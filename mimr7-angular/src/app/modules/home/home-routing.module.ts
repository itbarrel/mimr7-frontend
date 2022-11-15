import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'content',
    component: HomeComponent,
    loadChildren: () =>
      import('../content/content.module').then((m) => m.ContentModule),
  },
  {
    path: '',
    redirectTo: 'content',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
