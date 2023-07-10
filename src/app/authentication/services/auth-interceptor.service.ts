import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  // ! middlewares/interceptors:

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // * first thing to do is to get the token from our local storage (its either undefined or a valid token):
    const token = localStorage.getItem('heroToken2');
    // * now, req is inmutable, that is why we must clone it in order to set something.
    req = req.clone({
      setHeaders: {
        // * our header is called Authorization and inside we are providing our token. if no token, then an empty string.
        Authorization: token ?? '',
      },
    });
    // * next handle means we are continuing out request but we are also providing an updated request inside.
    return next.handle(req);
  }
}
// * now we inject this interceptor into our app. but not in auth module, instead in app module, because we want to do it at a global level. remember that to inject interceptors you have to do it in providers!
