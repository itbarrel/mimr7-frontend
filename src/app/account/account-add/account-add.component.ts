import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAccount } from 'src/app/shared/interfaces';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent {
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
    mobilePhone: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    city: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.accountForm.valid, this.accountForm);

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
      const organizationData: AddAccount = {
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
          this.router.navigateByUrl('/accounts')
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
