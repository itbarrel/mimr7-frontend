import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  returnUrl: string = '';

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    console.log('login',this.loginFrom.valid,this.loginFrom.value)
    if (this.loginFrom.valid) {
      const exp = new Date(new Date().getTime() + 1000 * 60 * 60).toUTCString();
      console.log('sss', exp);
      this.auth
        .login({ email: 'broek@crisisplan.nl', password: '12345678' })
        .subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token);
            this.cookieService.set('Auth_token', res.token, { expires: 4 });
            this.auth.getUser().subscribe(
              (res: any) => {
                localStorage.setItem('user', JSON.stringify(res));
                this.router.navigateByUrl(this.returnUrl);
              },
              (err: any) => {
                console.log('error', err);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  // @Input() error: string | null | undefined;

  // @Output() submitEM = new EventEmitter();

  login() {
    // http://localhost:8081/auth/login
  }
}
