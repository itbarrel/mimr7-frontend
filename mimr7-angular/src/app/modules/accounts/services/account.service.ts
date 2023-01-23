import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { Router } from '@angular/router';
import { AddAccount, Account } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountState = new BehaviorSubject<Account[]>([]);
  accountState$ = this.accountState.asObservable();
  constructor(private http: HttpClient,private env: EnvService) {}

  getAccountState() {
    return this.accountState$;
  }
  setAccountState(account: Account[]) {
    this.accountState.next(account);
  }

  addAccount(data: AddAccount): Observable<any> {
    return this.http.post(`${this.env.apiUrl}accounts`, data);
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
      `${this.env.apiUrl}accounts?offset=${pageNumber}&limit=${pageSize}&name=${name}`,
      query
    );
    return this.http.get(url);
  }
  getAccountById(id: string) {
    return this.http.get(`${this.env.apiUrl}accounts/${id}`);
  }
  updateAccount(id: string, data: any) {
    return this.http.put(`${this.env.apiUrl}accounts/${id}`, data);
  }
}
