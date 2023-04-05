import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { AuthService } from '../service/auth.service';
import { catchError  } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from the AuthService
    const token = this.authService.getToken();

    // Add the token to the request headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Handle any authentication errors
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Redirect to the login page if the user is not authenticated
          this.authService.logout();
          location.reload();
        }
        return throwError(error);
      })
    );
  }
}


