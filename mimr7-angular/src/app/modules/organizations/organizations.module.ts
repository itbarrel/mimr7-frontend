import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations/organizations.component';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganizationModalComponent } from './organization-modal/organization-modal.component';

@NgModule({
  declarations: [OrganizationsComponent, OrganizationModalComponent],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class OrganizationsModule {}
