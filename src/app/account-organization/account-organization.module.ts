import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountOrganizationRoutingModule } from './account-organization-routing.module';
import { AccountOrganizationComponent } from './account-organization/account-organization.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ToastrModule } from 'ngx-toastr';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccountOrganizationAddComponent } from './account-organization-add/account-organization-add.component';


@NgModule({
  declarations: [
    AccountOrganizationComponent,
    AccountOrganizationAddComponent
  ],
  imports: [
    CommonModule,
    AccountOrganizationRoutingModule,
    MatIconModule,
    NgxDatatableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CKEditorModule,
    ToastrModule.forRoot(),
    MatExpansionModule
  ]
})
export class AccountOrganizationModule { }
