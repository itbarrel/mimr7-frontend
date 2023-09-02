import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../service/auth.service';
import { AuthguardService } from '../service/authguard.service';
import { ADMIN, SUPERADMIN } from './permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private Authguardservice: AuthguardService,
    private router: Router
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.Authguardservice.gettoken()) {
      this.router.navigate(['/authentication/signin'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    let routes: string[] = [];
    let defaultRoute = '';
    const role = localStorage.getItem('role') ?? '';
    switch (role.toLowerCase()) {
      case 'superadmin':
        routes = SUPERADMIN.routes;
        defaultRoute = SUPERADMIN.default;
        break;
      case 'admin':
        routes = ADMIN.routes;
        defaultRoute = ADMIN.default;
        break;
      default:
        console.error('No Routes Found with this Role');
    }
    if (routes.length > 0) {
      let matched: boolean = false;
      const currentPath = state.url;
      for (const route of routes) {
        if (currentPath.includes(route)) {
          matched = true;
        }
      }
      if (!matched) {
        this.router.navigateByUrl(`${defaultRoute}`);
      }
    }
    return true;
  }
}
