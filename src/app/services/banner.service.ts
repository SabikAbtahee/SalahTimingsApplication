import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IBannersResponse } from '../interfaces/IBannersResponse.interface';
import { BannerKey, ChangeBannerInterval, ChangeBannerIntervalKey } from '../constants/app.const';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  fileUploaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  getBanners(): Observable<IBannersResponse> {
    return this.httpClient.get(
      environment.SalahTimesService + '/banner'
    ) as Observable<IBannersResponse>;
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('images', file);
    this.isLoading.next(true);
    return this.httpClient
      .post<any>(environment.SalahTimesService + '/banner/upload', formData)
      .pipe(
        tap((res) => {
          this.isLoading.next(false);
        })
      );
  }

  deleteFile(fileName: string): Observable<any> {
    this.isLoading.next(true);

    return this.httpClient
      .delete<any>(environment.SalahTimesService + `/banner/delete/${fileName}`)
      .pipe(
        tap((res) => {
          this.isLoading.next(false);
        })
      );
  }

  saveBannersToLocalStorage(banners: IBannersResponse) {
    localStorage.setItem(BannerKey, JSON.stringify(banners));
  }

  getBannersFromLocalStorage(): IBannersResponse {
    const storedValue = localStorage.getItem(BannerKey);
    return storedValue ? JSON.parse(storedValue) : [];
  }
    
  saveBannerIntervalToLocalStorage(time: number) {
    localStorage.setItem(ChangeBannerIntervalKey, JSON.stringify(time));
  }

  getBannerIntervalFromLocalStorage(): number {
    const storedValue = localStorage.getItem(ChangeBannerIntervalKey);
    return storedValue ? JSON.parse(storedValue) : ChangeBannerInterval;
  }
}
