import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { IPrayerTimings } from '../shared/app.interfaces';
import { Observable } from 'rxjs';
import * as SunCalc from 'suncalc';

import { toHijri, toGregorian } from 'hijri-converter';
import { IslamicMonths } from '../shared/app.const';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class TimingsService {
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}

  getTimings(): Observable<IPrayerTimings> {
    return this.httpClient.get(
      environment.SalahTimesService + '/timings'
    ) as Observable<IPrayerTimings>;
  }

  getHizriDate(date?: Date): Promise<string> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentDate = date ? date : new Date();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Get sunset time for the current date
            let sunset = SunCalc.getTimes(
              currentDate,
              latitude,
              longitude
            ).sunset;

            // Convert to Hijri
            let hijriDate = toHijri(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              currentDate.getDate()
            );

            // If the current time is after sunset, add one day to the Hijri date
            if (currentDate > sunset) {
              hijriDate = toHijri(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                currentDate.getDate() + 1
              );
            }
            const month = IslamicMonths[hijriDate.hm];
            resolve(`${month} ${hijriDate.hd}, ${hijriDate.hy}`);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  getEnglishDate(date?: Date): string | null {
    const currentDate = date ? date : new Date();

    return this.datePipe.transform(currentDate, 'E, MMMM dd, YYYY');
  }
}
