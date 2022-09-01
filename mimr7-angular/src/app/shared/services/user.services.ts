import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  constructor(private http: HttpClient) {}

  updateUser(id:string,data: any) {
    return this.http.put(`${environment.apiUrl}users/${id}`, data);
  }
}
