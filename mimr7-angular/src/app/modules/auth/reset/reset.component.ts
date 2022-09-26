import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CustomValidators } from 'src/app/shared/validators/confirm-password-validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  loginFrom: FormGroup = new FormGroup(
    {
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  );
  token: string = '';

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params); // { orderby: "price" }
      this.token = params.token;
      // this.orderby = params.orderby;
      // console.log(this.orderby); // price
    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get passwordMatchError() {
    return (
      this.loginFrom.getError('mismatch') &&
      this.loginFrom.get('confirmPassword')?.touched
    );
  }

  submit() {
    console.log(this.loginFrom);
    if (this.loginFrom.valid) {
      const { password } = this.loginFrom.value;
      this.auth
        .resetPassword({ password, token: this.token })
        .subscribe((res) => {
          this.toaster.success('Password Changed Successfuly');
          this.router.navigate(['/auth/login']);
        });
    }
  }
}
