import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';


import { NgIconsModule } from '@ng-icons/core';
import { bootstrapCaretDownFill,bootstrapPlusCircle } from '@ng-icons/bootstrap-icons';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgIconsModule.withIcons({ bootstrapCaretDownFill,bootstrapPlusCircle }),

  ]
})
export class HomeModule { }
