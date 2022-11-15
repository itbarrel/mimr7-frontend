import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';


import { MaterialModule } from 'src/app/material.module';
import { NgIconsModule } from '@ng-icons/core';
import { QuillModule } from 'ngx-quill'


import { bootstrapCaretDownFill,bootstrapPlusCircle } from '@ng-icons/bootstrap-icons';
// import { ContentComponent } from './content/content.component';
// import { ContentAddComponent } from './content-add/content-add.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightsComponent } from './highlights/highlights.component';
import { HighlightAddComponent } from './highlight-add/highlight-add.component';
import { ContentComponent } from './content/content.component';
import { ContentAddComponent } from './content-add/content-add.component';
import { ActionsComponent } from './actions/actions.component';


@NgModule({
  declarations: [
    ContentComponent,
    ContentAddComponent,
    HighlightsComponent,
    HighlightAddComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    MaterialModule,
    NgIconsModule.withIcons({ bootstrapCaretDownFill,bootstrapPlusCircle }),
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
