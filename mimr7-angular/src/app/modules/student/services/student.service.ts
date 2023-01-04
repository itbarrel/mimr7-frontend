import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Content, Student } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
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

  add(data: Student): Observable<any> {
    data.AccountId = this.user.AccountId;
    data.OrganizationId = this.user.OrganizationId;
    return this.http.post(`${environment.apiUrl}students`, data);
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
      `${environment.apiUrl}students?offset=${pageNumber}&limit=${pageSize}&name=${title}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${environment.apiUrl}students/${id}`);
  }
  update(id: string, data: Student) {
    return this.http.put(`${environment.apiUrl}students/${id}`, data);
  }
}
