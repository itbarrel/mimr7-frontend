import { Injectable } from '@angular/core';
// import { AuthguardServiceService } from '../service/authguard-service.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    // private Authguardservice: AuthguardServiceService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('Guard called')
    // if (!this.Authguardservice.gettoken()) {
    //   this.router.navigate(['login'], {
    //     queryParams: { returnUrl: state.url },
    //   });
    // }
    // return this.Authguardservice.gettoken();
    return true
  }
}
