import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  constructor(private http: HttpClient,private env: EnvService) {}

  updateUser(id:string,data: any) {
    return this.http.put(`${this.env.apiUrl}users/${id}`, data);
  }
}
