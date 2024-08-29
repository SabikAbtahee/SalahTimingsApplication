import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BannersResponse } from '../shared/app.interfaces';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private httpClient: HttpClient) {}

  getBanners(): Observable<BannersResponse> {
    return this.httpClient.get(
      environment.SalahTimesService + '/banner'
    ) as Observable<BannersResponse>;
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<any>(
      environment.SalahTimesService + '/banner/upload',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }
}
