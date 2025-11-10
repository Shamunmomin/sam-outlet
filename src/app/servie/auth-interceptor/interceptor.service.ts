import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('jwtToken');

  // List of public URLs
   const publicUrls = [
      `${Environment.apiUrl}/authenticate`,
     `${Environment.apiUrl}/signup`
    ];

  // Check if this request is public
  const isPublic = publicUrls.some(url => request.url.startsWith(url));

  if (isPublic) {
      return next.handle(request);
    }

  // ✅ Add token only for non-public requests
   if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

  return next.handle(request);
}

}
