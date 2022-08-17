import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let token = '';
    // if (localStorage.getItem('token')) {
    //   token = JSON.parse(
    //     this.encrypt.decrypt(localStorage.getItem('user') || '')
    //   ).api_key;
    //   console.log(
    //     JSON.parse(this.encrypt.decrypt(localStorage.getItem('user') || ''))
    //   );
    // }

    //set headers
    const customReq = request.clone({
        withCredentials:true,
      headers: new HttpHeaders({
        token: localStorage.getItem('token') || '',
        // token: environment.companyToken,
      }),
    });
    return next.handle(customReq)

    // pass on the modified request object
    // return next.handle(customReq).pipe(
    //   tap(
    //     (event) => {
    //       if (event instanceof HttpResponse) {
    //         this.loader.hide();
    //       }
    //     },
    //     (error) => {
    //       if (error instanceof HttpErrorResponse) {
    //         this.loader.hide();
    //         this.toaster.showError(error.error.error);
    //       }
    //     }
    //   )
    // );
  }
}
