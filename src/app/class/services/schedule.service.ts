import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Schedule } from 'src/app/shared/interfaces';
import { withQuery } from 'with-query';
import { EnvService } from 'src/app/env.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  user: any;
  constructor(private http: HttpClient, private auth: AuthService,private env: EnvService) {
    this.user = this.auth.getInitialUser()
  }


  add(data: Schedule): Observable<any> {
    data.AccountId = this.user.AccountId;
    // data.OrganizationId = this.user.OrganizationId;
    return this.http.post(`${this.env.apiUrl}klassSchedules`, data);
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
      `${this.env.apiUrl}klassSchedules?offset=${page.offset+1}&limit=${page.limit}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${this.env.apiUrl}klassSchedules/${id}`);
  }
  update(id: string, data: Schedule) {
    return this.http.put(`${this.env.apiUrl}klassSchedules/${id}`, data);
  }

   
}
