import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FixedPluginComponent } from './components/fixedplugin/fixedplugin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../material.module';




@NgModule({
  declarations: [
    SpinnerComponent,
    BreadcrumbComponent,
    FooterComponent,
    NavbarComponent,
    FixedPluginComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgbModule,
    MaterialModule
  ],
  exports:[
    SpinnerComponent,
    BreadcrumbComponent,
    NavbarComponent,
    FooterComponent,
    FixedPluginComponent
  ]
})
export class SharedModule { }
