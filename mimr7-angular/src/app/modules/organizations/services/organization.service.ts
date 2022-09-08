import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AddOrganization, Organization } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private organizationState = new BehaviorSubject<Organization[]>([]);
  organizationState$ = this.organizationState.asObservable();
  constructor(private http: HttpClient) {}

  getOrganizationState() {
    return this.organizationState$;
  }
  setOrganizationState(organization: Organization[]) {
    this.organizationState.next(organization);
  }

  addOrganization(data: AddOrganization): Observable<any> {
    return this.http.post(`${environment.apiUrl}organizations`, data);
  }

  // {{host}}v1/organizations?offset=1&limit=2
  getAll(pageNumber: number, pageSize: number, sortChange?: any, name?: string) {
    const sort: any = {};
    sort[sortChange.active] = sortChange.direction;
    const query = {
      sort,
      // filter
    };
    
    console.log('query',query);
    const url = withQuery(
      `${environment.apiUrl}organizations?offset=${pageNumber}&limit=${pageSize}&name=${name}`,
      query
    );
    return this.http.get(url);
  }
  getOrganizationById(id: string) {
    return this.http.get(`${environment.apiUrl}organizations/${id}`);
  }
  updateOrganization(id: string, data: any) {
    return this.http.put(`${environment.apiUrl}organizations/${id}`, data);
  }
}
