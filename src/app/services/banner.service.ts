import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { IBannersResponse } from '../interfaces/IBannersResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private httpClient: HttpClient) {}

  getBanners(): Observable<IBannersResponse> {
    return this.httpClient.get(
      environment.SalahTimesService + '/banner'
    ) as Observable<IBannersResponse>;
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('images', file);

    return this.httpClient.post<any>(
      environment.SalahTimesService + '/banner/upload',
      formData
    );
  }
}
