import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// import { this.env } from 'src/this.envs/this.env';
import { ClassList } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EnvService } from 'src/app/env.service';

@Injectable({
  providedIn: 'root',
})
export class ClassListService {
  //   private contentState = new BehaviorSubject<Content[]>([]);
  //   contentState$ = this.contentState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthenticationService,private env: EnvService) {
    this.auth.getUserState().subscribe((res) => {
      this.user = res;
    });
  }

  //   get() {
  //     return this.contentState$;
  //   }
  //   set(content: Content[]) {
  //     this.contentState.next(content);
  //   }

  add(data: ClassList): Observable<any> {
    data.AccountId = this.user.AccountId;
    // data.OrganizationId = this.user.OrganizationId;
    return this.http.post(`${this.env.apiUrl}classLists`, data);
  }

  getAll(
    pageNumber: number,
    pageSize: number,
    sortChange?: any,
    title?: string
  ) {
    const sort: any = {};
    sort[sortChange?.active] = sortChange?.direction;
    const query = {
      sort,
    };

    const url = withQuery(
      `${this.env.apiUrl}classLists?offset=${pageNumber}&limit=${pageSize}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${this.env.apiUrl}classLists/${id}`);
  }
  update(id: string, data: ClassList) {
    return this.http.put(`${this.env.apiUrl}classLists/${id}`, data);
  }

  addStudentsToClass(id: string, data: any) {
    return this.http.post(`${this.env.apiUrl}classLists/${id}/students`, {
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
      `${this.env.apiUrl}classLists/${id}/students`,
      options
    );
  }

  addContentToClass(id: string, data: any) {
    return this.http.post(`${this.env.apiUrl}classLists/${id}/contents`, {
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
      `${this.env.apiUrl}classLists/${id}/contents`,
      options
    );
  }
}
