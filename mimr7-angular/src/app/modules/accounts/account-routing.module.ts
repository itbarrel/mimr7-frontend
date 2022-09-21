import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAddComponent } from './account-add/account-add.component';
import { AccountsComponent } from './accounts/account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
  },
  {
    path: 'add',
    component: AccountAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
