import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AddOrganization, Organization } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';

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
  getAll(pageNumber: number, pageSize: number, sortChange?: any, name?: string) {
    const sort: any = {};
    sort[sortChange.active] = sortChange.direction;
    const query = {
      sort,
      // filter
    };
    
    console.log('query',query);
    const url = withQuery(
      `${environment.apiUrl}accounts?offset=${pageNumber}&limit=${pageSize}&name=${name}`,
      query
    );
    return this.http.get(url);
  }
  getAccountById(id: string) {
    return this.http.get(`${environment.apiUrl}accounts/${id}`);
  }
  updateAccount(id: string, data: any) {
    return this.http.put(`${environment.apiUrl}accounts/${id}`, data);
  }
}
