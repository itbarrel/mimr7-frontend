import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Message } from 'src/app/shared/interfaces';
// import { WithQueryOptions } from 'with-query/dist';
import { withQuery } from 'with-query';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageState = new BehaviorSubject<any[]>([]);
  messageState$ = this.messageState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.getUserState().subscribe((res) => {
      this.user = res;
    });
  }

  get() {
    return this.messageState$;
  }
  set(highlight: Message[]) {
    this.messageState.next(highlight);
  }

  add(data: Message): Observable<any> {
    data.AccountId = this.user.AccountId;
    // data.UserId = this.user.id;
    return this.http.post(`${environment.apiUrl}messages`, data);
  }
  // ?ContentId={{ContentId}}

  getByHighlightId(highlightId: string, title?: string) {
    // const sort: any = {};
    // sort[sortChange?.active] = sortChange?.direction;
    // const query = {
    //   sort,
    // };

    const url = withQuery(
      `${environment.apiUrl}messages?HighlightId=${highlightId}&name=${title}`
    );
    return this.http.get(url);
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
      `${environment.apiUrl}messages?offset=${pageNumber}&limit=${pageSize}&content=${title}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${environment.apiUrl}messages/${id}`);
  }
  update(id: string, data: Message) {
    return this.http.put(`${environment.apiUrl}messages/${id}`, data);
  }
}
