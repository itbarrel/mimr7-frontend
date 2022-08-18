import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AddOrganization, Organization } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private organizationState = new BehaviorSubject<Organization[]>([]);
  organizationState$ = this.organizationState.asObservable();
  constructor(private http: HttpClient) {}

  getUserState() {
    return this.organizationState$;
  }
  setUserState(organization: Organization[]) {
    this.organizationState.next(organization);
  }

  addOrganization(data: AddOrganization): Observable<any> {
    return this.http.post(`${environment.apiUrl}accounts`, data);
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}accounts`);
  }
}
