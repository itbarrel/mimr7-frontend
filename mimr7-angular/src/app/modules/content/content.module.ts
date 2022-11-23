import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';


import { MaterialModule } from 'src/app/material.module';
import { NgIconsModule } from '@ng-icons/core';
import { QuillModule } from 'ngx-quill'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { bootstrapCaretDownFill,bootstrapPlusCircle,bootstrapPencilSquare } from '@ng-icons/bootstrap-icons';

// import { ContentComponent } from './content/content.component';
// import { ContentAddComponent } from './content-add/content-add.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightsComponent } from './highlights/highlights.component';
import { HighlightAddComponent } from './highlight-add/highlight-add.component';
import { ContentComponent } from './content/content.component';
import { ContentAddComponent } from './content-add/content-add.component';
import { ActionsComponent } from './actions/actions.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesAddComponent } from './messages-add/messages-add.component';


@NgModule({
  declarations: [
    ContentComponent,
    ContentAddComponent,
    HighlightsComponent,
    HighlightAddComponent,
    ActionsComponent,
    MessagesComponent,
    MessagesAddComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    MaterialModule,
    NgIconsModule.withIcons({ bootstrapCaretDownFill,bootstrapPlusCircle,bootstrapPencilSquare }),
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ContentModule { }
