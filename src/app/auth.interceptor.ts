import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  console.log('HTTP Request URL:', url);

  const router = inject(Router);
  const zone = inject(NgZone);

  const token = typeof localStorage !== 'undefined'
    ? localStorage.getItem('sessionId')
    : null;
  const requestToSend = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

 
  return next(requestToSend).pipe(
  catchError((error: HttpErrorResponse) => {
    const token = localStorage.getItem('token'); // or however you store the token

    if ((error.status === 401 || error.status === 403) && !token) {
      console.log('Unauthorized error. Navigating to /unauthorised');
      zone.run(() => {
        router.navigate(['/unauthorised']);
      });
    }

    return throwError(() => error);
  })
);

};
