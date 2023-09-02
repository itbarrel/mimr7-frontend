import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { Klass } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { EnvService } from 'src/app/env.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  user: any;
  constructor(private http: HttpClient, private auth: AuthService,private env: EnvService) {
    this.user = this.auth.getInitialUser()
  }


  add(data: Klass): Observable<any> {
    data.AccountId = this.user.AccountId;
    // data.OrganizationId = this.user.OrganizationId;
    return this.http.post(`${this.env.apiUrl}klasses`, data);
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
      `${this.env.apiUrl}klasses?offset=${page.offset+1}&limit=${page.limit}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${this.env.apiUrl}klasses/${id}`);
  }
  update(id: string, data: Klass) {
    return this.http.put(`${this.env.apiUrl}klasses/${id}`, data);
  }

  addStudentsToClass(id: string, data: any) {
    return this.http.post(`${this.env.apiUrl}klasses/${id}/students`, {
      students: data,
    });
  }

  deleteStudentFromClass(id: string, data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { students: data },
    };
    return this.http.delete(
      `${this.env.apiUrl}klasses/${id}/students`,
      options
    );
  }

  addContentToClass(id: string, data: any) {
    return this.http.post(`${this.env.apiUrl}klasses/${id}/contents`, {
      contents: data,
    });
  }

  deleteContentFromClass(id: string, data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { contents: data },
    };
    return this.http.delete(
      `${this.env.apiUrl}klasses/${id}/contents`,
      options
    );
  }
}
