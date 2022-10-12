import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionslibraryRoutingModule } from './collectionslibrary-routing.module';
import { CollectionslibraryComponent } from './collectionslibrary/collectionslibrary.component';
import { CollectionslibraryAddComponent } from './collectionslibrary-add/collectionslibrary-add.component';


import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    CollectionslibraryComponent,
    CollectionslibraryAddComponent
  ],
  imports: [
    CommonModule,
    CollectionslibraryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ]
})
export class CollectionslibraryModule { }
