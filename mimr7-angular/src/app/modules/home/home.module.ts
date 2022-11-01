import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material.module';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapCaretDownFill } from '@ng-icons/bootstrap-icons'



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    NgIconsModule.withIcons({ bootstrapCaretDownFill }),

  ]
})
export class HomeModule { }
