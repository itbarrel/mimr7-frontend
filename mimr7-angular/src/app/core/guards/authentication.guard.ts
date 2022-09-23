import { Injectable } from '@angular/core';
// import { AuthguardServiceService } from '../service/authguard-service.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthguardService } from '../services/authguard.service';
import { PERMISSION } from '../../../assets/data/permission';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private Authguardservice: AuthguardService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.Authguardservice.gettoken()) {
      this.router.navigate(['auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    }
    const role = localStorage.getItem('role');
    const path = state.url.split('/');
    let url = '';
    if(path.length==4){
      url = path[path.length - 2]
    }
    else{
      url = path[path.length - 1]

    }
    PERMISSION.forEach((permission) => {
      if (role == permission.role) {
        if (permission.sites.includes(url)) {
          return this.Authguardservice.gettoken();
        } else {
          this.router.navigateByUrl(`dashboard/${permission.default}`);
          return true
        }
      }
      else{
        return false
      }
    });
    return this.Authguardservice.gettoken();
  }
}
