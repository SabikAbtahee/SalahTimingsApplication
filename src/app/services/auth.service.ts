import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthPayload, AuthResponse } from '../shared/app.interfaces';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(payload: AuthPayload): Observable<AuthResponse> {
    return this.httpClient.post<any>(
      environment.SalahTimesService + '/auth/login',
      payload
    );
  }
}
