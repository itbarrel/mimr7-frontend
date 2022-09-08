import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'accounts',
    loadChildren: () =>
      import('../accounts/account.module').then((m) => m.AccountsModule),
  },
  {
    path: 'organizations',
    loadChildren: () =>
      import('../organizations/organizations.module').then((m) => m.OrganizationsModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
