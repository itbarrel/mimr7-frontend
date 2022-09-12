import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../services/organization.service';
import { Organization } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss'],
})
export class OrganizationModalComponent implements OnInit {
  organizationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required]),
  });
  buttonText: String = 'Add';
  update: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OrganizationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.organizationForm.patchValue({
        name: this.data.name,
        city: this.data.city,
      });
      this.buttonText = 'Update';
      this.update = true;
    }
  }

  submit() {
    console.log(this.organizationForm.valid, this.organizationForm.value);

    if (this.organizationForm.valid) {
      const { name, city } = this.organizationForm.value;
      const organizationData: Organization = {
        name,
        city,
      };
      if (!this.update) {
        this.organizationService.addOrganization(organizationData).subscribe(
          (res: any) => {
            this.dialogRef.close({ success: true });
          },
          (err: any) => {
            console.log(err);
          }
        );
      } else {
        console.log('update called',this.data);
        this.organizationService.updateOrganization(this.data.id,organizationData).subscribe(
          (res: any) => {
            this.dialogRef.close({ success: true });
          },
          (err: any) => {
            console.log(err);
          }
        )
      }
    }
  }
}
