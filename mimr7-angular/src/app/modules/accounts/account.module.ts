import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountsComponent } from './accounts/account.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { AccountEditModalComponent } from './account-edit-modal/account-edit-modal.component';

@NgModule({
  declarations: [
    AccountEditModalComponent,
    AccountModalComponent,
    AccountsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    AccountRoutingModule,
  ],
})
export class AccountsModule {}
