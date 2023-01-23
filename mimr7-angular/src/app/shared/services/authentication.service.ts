import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // private userState = new BehaviorSubject<User>(
  //   JSON.parse(localStorage.getItem('user')||'') || null
  // );
  private userState = new BehaviorSubject<User>(this.getInitialUser());
  userState$ = this.userState.asObservable();

  constructor(private http: HttpClient, private router: Router,private env: EnvService) {}
  getUserState() {
    return this.userState$;
  }
  setUserState(user: User) {
    this.userState.next(user);
  }

  login(user: User) {
    return this.http.post(`${this.env.apiUrl}auth/login`, { ...user });
  }
  getUser() {
    return this.http.get(`${this.env.apiUrl}users/me`);
  }
  forgetPassword(data: User) {
    return this.http.post(`${this.env.apiUrl}auth/forgetpassword`, data);
  }
  resetPassword(data: User) {
    return this.http.post(`${this.env.apiUrl}auth/resetpassword`, data);
  }

  // logout(): void {
  //   localStorage.removeItem('user');
  //   this.setUserState(null);
  //   this.router.navigateByUrl('/login');
  // }

  getInitialUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}

type User = any;
