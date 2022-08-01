import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userState = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('user')||'') || null
  );
  userState$ = this.userState.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  getUserState() {
    return this.userState$;
  }
  setUserState(user: User) {
    this.userState.next(user);
  }

  login(user: User) {
    return this.http.post(`${environment.apiUrl}auth/login`, {
      email: user.email,
      password: user.password,
    });
  }
  getUser() {
    return this.http.get(`${environment.apiUrl}users/me`);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.setUserState(null);
    this.router.navigateByUrl('/login');
  }
}

type User = any;
email: 'broek@crisisplan.nl';
login_detail: '';
password: '12345678';
('broek@crisisplan.nl');
