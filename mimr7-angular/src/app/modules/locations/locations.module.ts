import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationComponent } from './location/location.component';
import { LocationAddComponent } from './location-add/location-add.component';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LocationComponent, LocationAddComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class LocationsModule {}
