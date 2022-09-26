import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  reset:boolean=false;
  loginFrom: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });
  // returnUrl: string = '';

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    if (this.loginFrom.valid) {
      const credentials = this.loginFrom.value;
      this.auth.forgetPassword(this.loginFrom.value).subscribe(res=>{
        this.reset=true
      })
      // this.auth.login({ credentials: credentials }).subscribe(
      //   (res: any) => {
      //     localStorage.setItem('token', res.token);
      //     localStorage.setItem('role', res.Role);
      //     localStorage.setItem('user', JSON.stringify(res.user));
      //     this.auth.setUserState(res.user)
      //     this.router.navigateByUrl(this.returnUrl);
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
    }
  }
}
