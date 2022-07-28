import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthenticationService,
    private cookieService: CookieService) {}
  submit() {
    const exp = new Date(new Date().getTime() + 1000*60*60).toUTCString();
    console.log('sss',exp)
    this.auth
      .login({ email: 'broek@crisisplan.nl', password: '12345678' })
      .subscribe(
        (res:any) => {
          localStorage.setItem('token',res.token)
          this.cookieService.set('Auth_token',res.token,{expires: 4})
          this.auth.getUser().subscribe((res:any)=>{
            console.log('get user',res)
          },(err:any)=>{
            console.log('error',err)
          })
        },
        (err) => {
          // console.log(err);
        }
      );
    if (this.form.valid) {
      // this.submitEM.emit(this.form.value);
    }
  }
  // @Input() error: string | null | undefined;

  // @Output() submitEM = new EventEmitter();

  ngOnInit(): void {}

  login() {
    // http://localhost:8081/auth/login
  }
}
