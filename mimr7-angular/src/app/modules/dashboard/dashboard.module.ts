import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../../material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent
    // HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
