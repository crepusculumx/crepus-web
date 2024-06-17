import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const defaultInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http')) {
    return next(req);
  }

  const newReq = req.clone({
    url: environment.api.baseUrl + req.url,
  });
  return next(newReq);
};
