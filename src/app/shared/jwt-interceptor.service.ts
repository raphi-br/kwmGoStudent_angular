import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private toastr: ToastrService,) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        //do what i want to do with respond
      }
  },
(err: any) => {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 401) {
    this.toastr.error("Incorrect username or password","Login error");
  }
}
}));
}}
