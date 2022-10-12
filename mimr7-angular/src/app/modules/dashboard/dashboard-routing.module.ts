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
    path: 'collectionslibrary',
    loadChildren: () =>
      import('../collectionslibrary/collectionslibrary.module').then((m) => m.CollectionslibraryModule),
  },
  {
    path: 'highlights',
    loadChildren: () =>
      import('../highlights/highlights.module').then((m) => m.HighlightsModule),
  },
  {
    path: 'highlightslibrary',
    loadChildren: () =>
      import('../highlightslibrary/highlightslibrary.module').then((m) => m.HighlightslibraryModule),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('../locations/locations.module').then((m) => m.LocationsModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
