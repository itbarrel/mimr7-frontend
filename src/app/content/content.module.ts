import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content/content.component';
import { ContentActionComponent } from './content-action/content-action.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContentAddComponent } from './content-add/content-add.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { HighlightsAddComponent } from './highlights-add/highlights-add.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesAddComponent } from './messages-add/messages-add.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { MatExpansionModule } from '@angular/material/expansion';
import { GptHighlightsComponent } from './gpt-highlights/gpt-highlights.component';

@NgModule({
  declarations: [
    ContentComponent,
    ContentActionComponent,
    ContentAddComponent,
    HighlightsComponent,
    HighlightsAddComponent,
    MessagesComponent,
    MessagesAddComponent,
    GptHighlightsComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
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
  ],
})
export class ContentModule {}
