import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentAddComponent } from './content-add/content-add.component';
import { ContentComponent } from './content/content.component';
import { HighlightsAddComponent } from './highlights-add/highlights-add.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { MessagesAddComponent } from './messages-add/messages-add.component';
import { MessagesComponent } from './messages/messages.component';
import { GptHighlightsComponent } from './gpt-highlights/gpt-highlights.component';
import { GptMessagesComponent } from './gpt-messages/gpt-messages.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
  },
  {
    path: 'add',
    component: ContentAddComponent,
    pathMatch:'full'

  },
  {
    path: ':id',
    component: ContentAddComponent,
    pathMatch:'full'
  },
  {
    path: ':id/suggested-highlights',
    component: GptHighlightsComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights',
    component: HighlightsComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/add',
    component: HighlightsAddComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/:hid',
    component: HighlightsAddComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/:hid/messages',
    component: MessagesComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/:hid/gpt-messages',
    component: GptMessagesComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/:hid/messages/:mid',
    component: MessagesAddComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/:hid/messages/add',
    component: MessagesAddComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
