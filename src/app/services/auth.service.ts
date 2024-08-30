import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '@env';
import { IAuthResponse } from '../interfaces/IAuthResponse.interface';
import { IAuthPayload } from '../interfaces/IAuthPayload.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(payload: IAuthPayload): Observable<IAuthResponse> {
    return this.httpClient
      .post<any>(environment.SalahTimesService + '/auth/login', payload)
      .pipe(
        tap((res: IAuthResponse) => {
          localStorage.setItem('token', res?.access_token);
        })
      );
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
