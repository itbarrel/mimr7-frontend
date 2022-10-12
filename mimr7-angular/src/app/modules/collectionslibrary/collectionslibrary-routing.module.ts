import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionslibraryAddComponent } from './collectionslibrary-add/collectionslibrary-add.component';
import { CollectionslibraryComponent } from './collectionslibrary/collectionslibrary.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionslibraryComponent,
  },
  { path:':id', component:CollectionslibraryAddComponent},
  {
    path: 'add',
    component: CollectionslibraryAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionslibraryRoutingModule { }
