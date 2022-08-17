import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOrganization } from 'src/app/shared/interfaces';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss'],
})
export class OrganizationModalComponent implements OnInit {
  organizationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', []),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    mobilePhone: new FormControl('', []),
    email: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<OrganizationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private organizationService: OrganizationService
  ) {}
  // organizationData:AddOrganization

  ngOnInit(): void {}

  submit() {
    console.log(this.organizationForm.valid, this.organizationForm.value);

    if (this.organizationForm.valid) {
      const {
        name,
        city,
        description,
        email,
        firstName,
        lastName,
        mobilePhone,
        password,
        userName,
      } = this.organizationForm.value;
      const organizationData: AddOrganization = {
        name: name,
        description: description,
        organization: {
          name: name,
          city: city,
        },
        admin: {
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          mobilePhone: mobilePhone,
        },
      };
      this.organizationService.addOrganization(organizationData).subscribe(
        (res) => {
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
