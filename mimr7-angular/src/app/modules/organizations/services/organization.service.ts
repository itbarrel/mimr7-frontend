import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { Organization } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private organizationState = new BehaviorSubject<Organization[]>([]);
  organizationState$ = this.organizationState.asObservable();
  user: any;
  constructor(private http: HttpClient,private auth:AuthenticationService,private env: EnvService) {
    this.auth.getUserState().subscribe((res) => {
      this.user = res
    });
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
    pageNumber: number,
    pageSize: number,
    sortChange?: any,
    name?: string
  ) {
    const sort: any = {};
    if(sortChange){
      sort[sortChange.active] = sortChange.direction;
    }
    const query = {
      sort,
    };

    const url = withQuery(
      `${this.env.apiUrl}organizations?offset=${pageNumber}&limit=${pageSize}&name=${name}`,
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
}
