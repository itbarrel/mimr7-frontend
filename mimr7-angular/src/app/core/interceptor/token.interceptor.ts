import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    //set headers
    const customReq = request.clone({
        // withCredentials:true,
      headers: new HttpHeaders({
        token: localStorage.getItem('token') || '',
        'Content-Type':'application/json'
      }),
    });
    return next.handle(customReq)
  }
}
