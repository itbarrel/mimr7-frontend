import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections/collections.component';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollectionModalComponent } from './collection-modal/collection-modal.component';
import { CollectionAddComponent } from './collection-add/collection-add.component';


@NgModule({
  declarations: [
    CollectionsComponent,
    CollectionModalComponent,
    CollectionAddComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class CollectionsModule { }
