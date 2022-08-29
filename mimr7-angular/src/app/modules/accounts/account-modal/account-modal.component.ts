import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOrganization } from 'src/app/shared/interfaces';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
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
    public dialogRef: MatDialogRef<AccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService
  ) {}
  // organizationData:AddOrganization

  ngOnInit(): void {}

  submit() {
    console.log(this.accountForm.valid, this.accountForm.value);

    if (this.accountForm.valid) {
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
      } = this.accountForm.value;
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
      this.accountService.addAccount(organizationData).subscribe(
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
