import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private env: EnvService) {}

  updateUser(id: string, data: any) {
    return this.http.put(`${this.env.apiUrl}users/${id}`, data);
  }
}
