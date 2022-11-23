import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentAddComponent } from './content-add/content-add.component';
import { ContentComponent } from './content/content.component';
import { HighlightAddComponent } from './highlight-add/highlight-add.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { MessagesAddComponent } from './messages-add/messages-add.component';
import { MessagesComponent } from './messages/messages.component';

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
    path: ':id/highlights',
    component: HighlightsComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/add',
    component: HighlightAddComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/:hid',
    component: HighlightAddComponent,
    pathMatch:'full'
  },
  {
    path: ':id/highlights/:hid/messages',
    component: MessagesComponent,
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
