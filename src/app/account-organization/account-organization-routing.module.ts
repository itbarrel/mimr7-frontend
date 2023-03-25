import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOrganizationAddComponent } from './account-organization-add/account-organization-add.component';
import { AccountOrganizationComponent } from './account-organization/account-organization.component';

const routes: Routes = [
  {
    path: '',
    component: AccountOrganizationComponent,
  },
  {
    path: 'add',
    component: AccountOrganizationAddComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: AccountOrganizationAddComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountOrganizationRoutingModule {}
