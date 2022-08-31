import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-edit-modal',
  templateUrl: './account-edit-modal.component.html',
  styleUrls: ['./account-edit-modal.component.scss'],
})
export class AccountEditModalComponent implements OnInit {
  organizationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  UserForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', []),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    mobilePhone: new FormControl('', []),
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<AccountEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    console.log(';;;', this.data);
    this.patchValues();
  }

  patchValues() {
    this.accountService.getAccountById(this.data.id).subscribe((res: any) => {
      console.log('resss', res);
      const { name, description } = res.account;
      this.organizationForm.patchValue({
        name,
        description,
      });
      if (res.admin.lenght > 0) {
        const { userName, firstName, lastName, mobilePhone, email } =
          res.admin[0];
        this.UserForm.patchValue({
          userName,
          firstName,
          lastName,
          mobilePhone,
          email,
        });
      }
    });
  }

  onSubmitOrganization() {
    console.log(this.organizationForm.value);
    if (this.organizationForm.valid) {
      this.accountService.updateAccount(
        this.data.id,
        this.organizationForm.value
      ).subscribe(res=>{
        console.log(res)
        this.dialogRef.close()
      });
    }
  }
  onSubmitUserForm() {
    console.log(this.UserForm.value);
    if(this.UserForm.valid){
      
    }
  }
}
