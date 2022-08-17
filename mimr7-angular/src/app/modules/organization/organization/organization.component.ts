import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationModalComponent } from '../organization-modal/organization-modal.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  host: {
    class: 'organization-container',
  },
})
export class OrganizationComponent implements OnInit {
  path: string = 'Dashboard';
  active: string = 'Organizations';
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openOrganizationModal(): void {
    const dialogRef = this.dialog.open(OrganizationModalComponent, {
      width: '50%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: { name: 'open', animal: 'dialoge' },
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }
}
