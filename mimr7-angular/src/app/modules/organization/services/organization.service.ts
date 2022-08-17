import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AddOrganization } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private http: HttpClient) {}

  addOrganization(data: AddOrganization): Observable<any> {
    return this.http.post(`${environment.apiUrl}accounts`, data);
  }
}
