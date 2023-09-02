import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private env: EnvService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.env.apiUrl}auth/login`, {
        credentials: {
          email,
          password,
        },
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.Role);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  getUser() {
    return this.http.get(`${this.env.apiUrl}users/me`);
  }
  forgetPassword(data: any) {
    return this.http.post(`${this.env.apiUrl}auth/forgetpassword`, data);
  }
  resetPassword(data: any) {
    return this.http.post(`${this.env.apiUrl}auth/resetpassword`, data);
  }

  getInitialUser() {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    if (user) {
      return { ...JSON.parse(user), role };
    }
    return null;
  }
}
