import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AddOrganization, Organization } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountState = new BehaviorSubject<Organization[]>([]);
  accountState$ = this.accountState.asObservable();
  constructor(private http: HttpClient) {}

  getAccountState() {
    return this.accountState$;
  }
  setAccountState(organization: Organization[]) {
    this.accountState.next(organization);
  }

  addAccount(data: AddOrganization): Observable<any> {
    return this.http.post(`${environment.apiUrl}accounts`, data);
  }

  // {{host}}v1/accounts?offset=1&limit=2
  getAll(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${environment.apiUrl}accounts?offset=${pageNumber}&limit=${pageSize}`
    );
  }
  getAccountById(id: string) {
    return this.http.get(`${environment.apiUrl}accounts/${id}`);
  }
  updateAccount(id: string, data: any) {
    return this.http.put(`${environment.apiUrl}accounts/${id}`, data);
  }
}
