import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Student } from 'src/app/shared/interfaces';
import { withQuery } from 'with-query';
import { EnvService } from 'src/app/env.service';
import { AuthService } from 'src/app/core/service/auth.service';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  //   private contentState = new BehaviorSubject<Content[]>([]);
  //   contentState$ = this.contentState.asObservable();
  user: any;
  constructor(private http: HttpClient, private auth: AuthService,private env: EnvService) {
    this.user = this.auth.getInitialUser()
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
    return this.http.post(`${this.env.apiUrl}students`, data);
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
      `${this.env.apiUrl}students?offset=${page.offset+1}&limit=${page.limit}&name=${name}`,
      query
    );
    return this.http.get(url);
  }
  getById(id: string) {
    return this.http.get(`${this.env.apiUrl}students/${id}`);
  }
  update(id: string, data: Student) {
    return this.http.put(`${this.env.apiUrl}students/${id}`, data);
  }

  getByClass(classId: string) {
    return this.http.get(`${this.env.apiUrl}students/klass/${classId}`);
  }
}