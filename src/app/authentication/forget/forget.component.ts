import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
// import { AuthenticationService } from 'src/app/shared/services/authentication.service';

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
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginFrom.valid) {
      const credentials = this.loginFrom.value;
      this.auth.forgetPassword(this.loginFrom.value).subscribe((res:any)=>{
        this.reset=true
      })
    }
  }
}
