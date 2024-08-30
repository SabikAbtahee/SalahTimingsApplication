import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { AuthModalComponent } from '../components/auth-modal/auth-modal.component';
import { IAuthResponse } from '../interfaces/IAuthResponse.interface';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const dialog = inject(MatDialog);

  const token = authService.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Open the password dialog
        const dialogRef = dialog.open(AuthModalComponent);

        return dialogRef.afterClosed().pipe(
          switchMap((password: string) => {
            if (password) {
              // Use the entered password to get a new token
              return authService.login({ password: password }).pipe(
                switchMap((newToken: IAuthResponse) => {
                  const clonedRequest = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newToken.access_token}`,
                    },
                  });
                  return next(clonedRequest);
                })
              );
            } else {
              return throwError(() => error);
            }
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
}
