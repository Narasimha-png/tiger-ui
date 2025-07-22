import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
 debugger;
  console.log('HTTP Interceptor Triggered');
  return next(req);
};
