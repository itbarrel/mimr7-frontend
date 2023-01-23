import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightsRoutingModule } from './highlights-routing.module';
import { HighlightsComponent } from './highlights/highlights.component';
import { HighlightsAddComponent } from './highlights-add/highlights-add.component';

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    // HighlightsComponent, HighlightsAddComponent
  ],
  imports: [
    // CommonModule,
    // HighlightsRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MaterialModule,
    // SharedModule,
    // NgSelectModule
  ],
})
export class HighlightsModule {}
