import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ConfirmPassword } from 'src/app/core/validators/confirm-password.validator';
// import { AuthenticationService } from 'src/app/shared/services/authentication.service';
// import { CustomValidators } from 'src/app/shared/validators/confirm-password-validator';
// import { ToastrService } from 'ngx-toastr';

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
    [ConfirmPassword.MatchValidator('password', 'confirmPassword')]
  );
  token: string = '';
  reset: boolean = false;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params); // { orderby: "price" }
      this.token = params.token;
    });
  }
  get passwordMatchError() {
    return (
      this.loginFrom.getError('mismatch') &&
      this.loginFrom.get('confirmPassword')?.touched
    );
  }

  onSubmit() {
    console.log(this.loginFrom);
    if (this.loginFrom.valid) {
      const { password } = this.loginFrom.value;
      this.auth
        .resetPassword({ password, token: this.token })
        .subscribe((res) => {
          this.router.navigate(['/authentication/signin']);
        });
    }
  }
}
