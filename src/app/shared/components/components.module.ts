import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, ConfirmationDialogComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent,ConfirmationDialogComponent],
})
export class ComponentsModule {}
