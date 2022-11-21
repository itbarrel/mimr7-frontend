import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentAddComponent } from './content-add/content-add.component';
import { ContentComponent } from './content/content.component';
import { HighlightAddComponent } from './highlight-add/highlight-add.component';
import { HighlightsComponent } from './highlights/highlights.component';

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
    component: HighlightAddComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
