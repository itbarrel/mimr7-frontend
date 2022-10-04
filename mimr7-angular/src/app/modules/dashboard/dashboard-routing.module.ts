import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  {
    path: 'collections',
    loadChildren: () =>
      import('../collections/collections.module').then((m) => m.CollectionsModule),
  },
  {
    path: 'highlights',
    loadChildren: () =>
      import('../highlights/highlights.module').then((m) => m.HighlightsModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
