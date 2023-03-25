import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
  },
  { path: ':id', component: LocationAddComponent },
  {
    path: 'add',
    component: LocationAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
