import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Organization } from 'src/app/shared/interfaces';
import { withQuery } from 'with-query';
import { EnvService } from 'src/app/env.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private organizationState = new BehaviorSubject<Organization[]>([]);
  organizationState$ = this.organizationState.asObservable();
  user: any;
  constructor(private http: HttpClient,private auth:AuthService,private env: EnvService) {
    this.user = this.auth.getInitialUser()
  }

  getOrganizationState() {
    return this.organizationState$;
  }
  setOrganizationState(organization: Organization[]) {
    this.organizationState.next(organization);
  }

  addOrganization(data: Organization): Observable<any> {
    data.AccountId=this.user.AccountId
    return this.http.post(`${this.env.apiUrl}organizations`, data);
  }

  getAll(
    page:any,
    name?: string
  ) {
    const sort: any = {};
    if(page.orderBy){
      sort[page?.orderBy] = page?.orderDir;
    }
    const query = {
      sort,
    };

    const url = withQuery(
      `${this.env.apiUrl}organizations?offset=${page.offset+1}&limit=${page.limit}&name=${name}`,
      query
    );
    return this.http.get(url);
  }
  getOrganizationById(id: string) {
    return this.http.get(`${this.env.apiUrl}organizations/${id}`);
  }
  updateOrganization(id: string, data: Organization) {
    return this.http.put(`${this.env.apiUrl}organizations/${id}`, data);
  }

  getById(id: string) {
    return this.http.get(`${this.env.apiUrl}organizations/${id}`);
  }
}
