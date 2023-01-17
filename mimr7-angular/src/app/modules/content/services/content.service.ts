import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Content } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentState = new BehaviorSubject<Content[]>([]);
  contentState$ = this.contentState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.getUserState().subscribe((res) => {
      this.user = res;
    });
  }

  get() {
    return this.contentState$;
  }
  set(content: Content[]) {
    this.contentState.next(content);
  }

  add(data: Content): Observable<any> {
    data.AccountId = this.user.AccountId;
    data.UserId = this.user.id;
    return this.http.post(`${environment.apiUrl}contents`, data);
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
      `${environment.apiUrl}contents?offset=${pageNumber}&limit=${pageSize}&title=${title}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${environment.apiUrl}contents/${id}`);
  }
  update(id: string, data: Content) {
    return this.http.put(`${environment.apiUrl}contents/${id}`, data);
  }

  getContentByClassId(id: string) {
    return this.http.get(`${environment.apiUrl}contents/classList/${id}`);
  }
}
