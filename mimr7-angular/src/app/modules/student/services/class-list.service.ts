import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ClassList } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ClassListService {
  //   private contentState = new BehaviorSubject<Content[]>([]);
  //   contentState$ = this.contentState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
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
    return this.http.post(`${environment.apiUrl}classLists`, data);
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
      `${environment.apiUrl}classLists?offset=${pageNumber}&limit=${pageSize}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${environment.apiUrl}classLists/${id}`);
  }
  update(id: string, data: ClassList) {
    return this.http.put(`${environment.apiUrl}classLists/${id}`, data);
  }

  addStudentsToClass(id: string, data: any) {
    return this.http.post(
      `${environment.apiUrl}classLists/${id}/students`,
      data
    );
  }

  deleteStudentFromClass(id: string, data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.http.delete(
      `${environment.apiUrl}classLists/${id}/students`,
      options
    );
  }
}
