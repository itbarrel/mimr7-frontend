import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighlightslibraryAddComponent } from './highlightslibrary-add/highlightslibrary-add.component';
import { HighlightslibraryComponent } from './highlightslibrary/highlightslibrary.component';

const routes: Routes = [
  {
    path: '',
    component: HighlightslibraryComponent,
  },
  { path:':id', component:HighlightslibraryAddComponent},
  {
    path: 'add',
    component: HighlightslibraryAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighlightslibraryRoutingModule { }
