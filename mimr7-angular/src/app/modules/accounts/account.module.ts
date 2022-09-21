import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountsComponent } from './accounts/account.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountEditModalComponent } from './account-edit-modal/account-edit-modal.component';
import { AccountAddComponent } from './account-add/account-add.component';

@NgModule({
  declarations: [
    AccountEditModalComponent,
    AccountsComponent,
    AccountAddComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AccountRoutingModule,
  ],
})
export class AccountsModule {}
