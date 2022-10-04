import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighlightsAddComponent } from './highlights-add/highlights-add.component';
import { HighlightsComponent } from './highlights/highlights.component';

const routes: Routes = [
  {
    path: '',
    component: HighlightsComponent,
  },
  { path:':id', component:HighlightsAddComponent},
  {
    path: 'add',
    component: HighlightsAddComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighlightsRoutingModule { }
