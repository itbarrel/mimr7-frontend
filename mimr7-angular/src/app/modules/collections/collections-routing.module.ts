import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionAddComponent } from './collection-add/collection-add.component';
import { CollectionsComponent } from './collections/collections.component';

const routes: Routes = [
  { path: '', component: CollectionsComponent },
  { path: 'add', component: CollectionAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
